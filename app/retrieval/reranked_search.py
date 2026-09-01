import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from embeddings.embedder import Embedder
from vectorstore.qdrant_store import QdrantStore
from reranker import Reranker

def main():
    
    query = "Teknologi apa saja yang digunakan dalam project DRI?"
    
    print(f"query: {query}")
    
    embedder = Embedder()
    query_vector = embedder.embed_query(query)
    
    store = QdrantStore()
    
    results = store.client.query_points(
        collection_name="dri_documents",
        query=query_vector.tolist(),
        limit=10,
        with_payload=True
    ).points
    
    documents = [
        result.payload['text']
        for result in results
    ]
    
    reranker = Reranker()
    
    reranked_results = reranker.rerank(
        query,
        documents,
        top_k=3
    )
    
    print("reranked results:")
    
    for i, (document, score) in enumerate(reranked_results, start=1):
        original_result = next(
            result
            for result in results
            if result.payload['text'] == document
        )
        
        payload = original_result.payload
        
        print(f"[{i}] score: {score[0]:.4f}")
        print(f"page: {payload['page']}")
        print(f"source: {payload['source']}")
        print(f"chunk id: {payload['chunk_id']}")
        print(f"text:\n{payload['text'][:700]}")
        
if __name__ == "__main__":
    main()