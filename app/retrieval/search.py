import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from embeddings.embedder import Embedder
from vectorstore.qdrant_store import QdrantStore

def main():
    
    query = "Apa saja functional requirement sistem?"
    
    print(f"query: {query}")
    
    embedder = Embedder()
    
    query_vector = embedder.embed_query(query)
    
    store = QdrantStore()
    
    results = store.client.query_points(
        collection_name="dri_documents",
        query=query_vector.tolist(),
        limit=5,
        with_payload=True
    ).points 
    
    print("results:")
    
    for i, result in enumerate(results, start=1):
        payload = result.payload

        print(f"[{i}] Score: {result.score:.4f}")
        print(f"Page: {payload['page']}")
        print(f"Source: {payload['source']}")
        print(f"Chunk ID: {payload['chunk_id']}")
        print(f"Text:\n{payload['text'][:500]}")
        print("-" * 80)


if __name__ == "__main__":
    main()