import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

from app.embeddings.embedder import Embedder
from app.vectorstore.qdrant_store import QdrantStore


def load_test_cases():
    path = ROOT_DIR / "evaluation" / "test_cases.json"

    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def main():
    print("find relevant chunks evaluation script")

    embedder = Embedder()
    store = QdrantStore()

    test_cases = load_test_cases()

    for i, test_case in enumerate(test_cases, start=1):

        question = test_case["question"]
        expected = test_case["expected"]

        print(f"\n[{i}/{len(test_cases)}]")
        print(f"Question : {question}")
        print(f"Expected : {expected}")

        query_vector = embedder.embed_query(question)

        results = store.client.query_points(
            collection_name="dri_documents",
            query=query_vector.tolist(),
            limit=10,
            with_payload=True
        ).points

        candidates = []

        for rank, result in enumerate(results, start=1):

            text = result.payload["text"].lower()

            matched = [
                keyword
                for keyword in expected
                if keyword.lower() in text
            ]

            if matched:
                candidates.append({
                    "rank": rank,
                    "chunk_id": result.payload["chunk_id"],
                    "page": result.payload["page"],
                    "score": result.score,
                    "matched": matched
                })

        if candidates:
            print("\nCandidate relevant chunks:")

            for candidate in candidates:
                print(
                    f"  Rank {candidate['rank']} | "
                    f"{candidate['chunk_id']} | "
                    f"Page {candidate['page']} | "
                    f"Score {candidate['score']:.4f} | "
                    f"Matched: {candidate['matched']}"
                )

        else:
            print("\nNo candidate chunks found.")


if __name__ == "__main__":
    main()