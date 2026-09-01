import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

from app.embeddings.embedder import Embedder
from app.vectorstore.qdrant_store import QdrantStore


COLLECTION_NAME = "dri_documents"


def load_test_cases():
    path = ROOT_DIR / "evaluation" / "retrieval_test_cases.json"

    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def evaluate_retrieval(results, relevant_chunks, k):
    retrieved_chunks = [
        result.payload["chunk_id"]
        for result in results[:k]
    ]

    return any(
        chunk_id in retrieved_chunks
        for chunk_id in relevant_chunks
    )


def main():
    print("retrieval evaluation")

    embedder = Embedder()
    store = QdrantStore()

    test_cases = load_test_cases()

    results_by_k = {
        1: [],
        3: [],
        5: [],
        10: []
    }

    for i, test_case in enumerate(test_cases, start=1):

        question = test_case["question"]
        relevant_chunks = test_case["relevant_chunks"]

        print(f"\n[{i}/{len(test_cases)}]")
        print(f"question : {question}")
        print(f"relevant : {relevant_chunks}")

        query_vector = embedder.embed_query(question)

        results = store.client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector.tolist(),
            limit=10,
            with_payload=True
        ).points

        retrieved = [
            result.payload["chunk_id"]
            for result in results
        ]

        print(f"retrieved: {retrieved}")

        for k in results_by_k:
            passed = evaluate_retrieval(
                results,
                relevant_chunks,
                k
            )

            results_by_k[k].append(passed)

            status = "HIT" if passed else "MISS"

            print(f"recall@{k}: {status}")

    print("retrieval evaluation summary")

    total = len(test_cases)

    for k, results in results_by_k.items():
        hits = sum(results)
        recall = hits / total * 100

        print(
            f"recall@{k:<2}: "
            f"{hits}/{total} "
            f"({recall:.2f}%)"
        )


if __name__ == "__main__":
    main()