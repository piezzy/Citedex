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
    
    def rerank(self, query, documents, top_k=3):
        
        documents = [
            result.payload['text']
            for result in documents
        ]
        
        return self.reranker.rerank(
            query,
            documents,
            top_k=top_k
        )
    
    def build_context(self, results):
        
        context_parts = []
        
        for document, score in results:
            
            context_parts.append(
                f"""
[Source: DRI Document]

{document}
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
        
        results = self.retrieve(query)
        
        reranked_results = self.rerank(query, results)
        context = self.build_context(reranked_results)
        answer = self.generate(query, context)
        
        return answer, reranked_results