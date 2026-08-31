from qdrant_store import QdrantStore

def main():
    store = QdrantStore()
    store.create_collection()
    print("Collection creation process completed.")
    
if __name__ == "__main__":
    main()