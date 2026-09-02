import sys 
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from embeddings.embedder import Embedder
from vectorstore.qdrant_store import QdrantStore
from retrieval.reranker import Reranker
from llm.llm import LLM

class RAG:
    
    def __init__(self):
        
        print("initializing rag..")
        
        self.embedder = Embedder()
        self.store = QdrantStore()
        self.reranker = Reranker()
        self.llm = LLM()
    
    def retrieve(self, query, top_k=10):
        
        query_vector = self.embedder.embed_query(query)
        
        results = self.store.client.query_points(
            collection_name="dri_documents",
            query=query_vector.tolist(),
            limit=top_k,
            with_payload=True
        ).points
        
        return results
    
    def rerank(self, query, results, top_k=5):
        
        return self.reranker.rerank(
            query,
            results,
            top_k=top_k
        )
        
    def expand_reranked_neighbors(self, results, window=1):

        expanded = []
        seen = set()

        for result in results:

            chunk_id = result["chunk_id"]

            neighbors = self.store.get_neighbor_chunks(
                chunk_id,
                window=window
            )

            for neighbor in neighbors:

                neighbor_id = neighbor.payload["chunk_id"]

                if neighbor_id in seen:
                    continue

                expanded.append({
                    "text": neighbor.payload["text"],
                    "score": result["score"],
                    "chunk_id": neighbor_id,
                    "source": neighbor.payload["source"],
                    "page": neighbor.payload["page"]
                })

                seen.add(neighbor_id)

        return expanded

    def filter_cited_sources(self, answer, sources):
        import re
        
        cited_numbers = {
            int(number)
            for number in re.findall(r"\[(\d+)\]", answer)
        }
        
        filtered_sources = []
        
        for index, source in enumerate(sources, start=1):
            if index in cited_numbers:
                filtered_sources.append({
                    "citation": index,
                    "page": source["page"],
                    "source": source["source"],
                    "chunk_id": source["chunk_id"],
                    "text": source["text"]   
                })
        return filtered_sources
    
    def build_context(self, results):
        context_parts = []

        for i, result in enumerate(results, start=1):
            context_parts.append(
                f"""
    [SOURCE {i}]
    Page: {result['page']}
    Chunk: {result['chunk_id']}

    {result['text']}
    """
            )

        return "\n".join(context_parts)
    
    def generate(self, query, context):
        prompt = f"""
    You are an assistant answering questions about the
    Digital Resource Identifier (DRI) project.

    Answer the question ONLY using the provided context.

    STRICT GROUNDING RULES:
    - Do not add information that is not explicitly stated in the context.
    - Do not make assumptions or generalizations.
    - Do not explain why a technology was chosen unless the context explicitly states the reason.
    - If the answer cannot be found in the context, say:
    "Informasi tersebut tidak tersedia dalam dokumen."

    CITATION RULES:
    - Cite factual statements using [1], [2], etc.
    - Use ONLY citation numbers that exist in the provided context.
    - Do not invent citation numbers.
    - Put citations immediately after the statement they support.
    - If multiple sources support a statement, multiple citations may be used.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """

        return self.llm.generate(prompt)

    def ask(self, query):
        results = self.retrieve(query, top_k=10)
        expanded_results = self.expand_neighbors(results, window=1)
        reranked_results = self.rerank(query, expanded_results, top_k=3)
        final_results = self.expand_reranked_neighbors(
            reranked_results,
            window=1
        )

        context = self.build_context(final_results)
        answer = self.generate(query, context)
        sources = self.filter_cited_sources(answer, final_results)

        return answer, sources
    
    def expand_neighbors(self, results, window=1):

        expanded = []
        seen = set()

        for result in results:

            chunk_id = result.payload["chunk_id"]

            neighbors = self.store.get_neighbor_chunks(
                chunk_id,
                window=window
            )

            for neighbor in neighbors:

                neighbor_id = neighbor.payload["chunk_id"]

                if neighbor_id not in seen:

                    expanded.append(neighbor)
                    seen.add(neighbor_id)

        return expanded
    
