from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

COLLECTION_NAME = "dri_documents"
VECTOR_SIZE = 1024

class QdrantStore:
    def __init__(self):
        self.client = QdrantClient(
            url="http://localhost:6333"
        )
        
    def create_collection(self):
        collections = self.client.get_collections()
        
        existing_collections = [
            collections.name 
            for collections in collections.collections
        ]
        
        if COLLECTION_NAME not in existing_collections:
            self.client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=VECTOR_SIZE,
                    distance=Distance.COSINE
                )
            )
            print(f"Collection '{COLLECTION_NAME}' created.")
        else:
            print(f"Collection '{COLLECTION_NAME}' already exists.")
            
    def upsert_documents(self, chunks, embeddings):
        points = []
        
        for index, (chunk, embedding) in enumerate(
            zip(chunks, embeddings)
        ):
            point = PointStruct(
                id=index,
                vector=embedding.tolist(),
                payload={
                    "text": chunk["text"],
                    "chunk_id": chunk["chunk_id"],
                    "source": chunk["meta_data"]["source"],
                    "page": chunk["meta_data"]["page"]
                }
            )
            points.append(point)
        
        self.client.upsert(
            collection_name=COLLECTION_NAME,
            points=points
        )
        
        print(f"{len(points)} documents indexed")