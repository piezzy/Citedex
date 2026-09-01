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
    
    def build_context(self, results):

        context_parts = []

        for result in results:

            context_parts.append(
                f"""
    [Source: {result['source']} | Page: {result['page']}]

    {result['text']}
    """
            )

        return "\n".join(context_parts)
        
    def generate(self, query, context):
        
        prompt = f"""
    You are an assistant answering questions about the
    Digital Resource Identifier (DRI) project.

    Answer the question ONLY using the provided context.

    If the answer cannot be found in the context,
    say that the information is not available in the document.

    Do not make up information.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """
        return self.llm.generate(prompt)

    def ask(self, query):

        results = self.retrieve(query, top_k=10)

        expanded_results = self.expand_neighbors(
            results,
            window=1
        )

        reranked_results = self.rerank(
            query,
            expanded_results,
            top_k=3
        )
        
        final_results = self.expand_reranked_neighbors(
            reranked_results,
            window=1
        )

        context = self.build_context(
            final_results
        )

        answer = self.generate(
            query,
            context
        )

        return answer, reranked_results
    
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
    
