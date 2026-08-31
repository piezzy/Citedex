import json
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).resolve().parents[1]))

from embeddings.embedder import Embedder
from vectorstore.qdrant_store import QdrantStore

BASE_DIR = Path(__file__).resolve().parents[2]

CHUNKS_PATH = BASE_DIR / "data" / "processed"/"chunks.json"

def main():
    
    with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
        chunks = json.load(f)
    
    print(f"loaded {len(chunks)} chunks")
    
    texts = [
        chunk["text"] for chunk in chunks
    ]
    
    embedder = Embedder()
    
    embeddings = embedder.embed_documents(texts)
    
    print(f"generated {len(embeddings)} embeddings")
    
    store = QdrantStore()
    
    store.create_collection()
    
    store.upsert_documents(chunks, embeddings)
    
    print("indexing completed")
    
if __name__ == "__main__":
    main()