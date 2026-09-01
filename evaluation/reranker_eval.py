import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

from app.embeddings.embedder import Embedder
from app.vectorstore.qdrant_store import QdrantStore
from app.retrieval.reranker import Reranker


COLLECTION_NAME = "dri_documents"


def load_test_cases():
    path = ROOT_DIR / "evaluation" / "retrieval_test_cases.json"

    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def check_recall(results, relevant_chunks, k):
    retrieved = [
        result.payload["chunk_id"]
        if hasattr(result, "payload")
        else result["chunk_id"]
        for result in results[:k]
    ]

    return any(
        chunk_id in retrieved
        for chunk_id in relevant_chunks
    )


def main():
    print("reranker evaluation")

    embedder = Embedder()
    store = QdrantStore()
    reranker = Reranker()

    test_cases = load_test_cases()

    dense_results = {
        1: [],
        3: [],
        5: [],
        10: []
    }

    reranked_results = {
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

        dense = store.client.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector.tolist(),
            limit=10,
            with_payload=True
        ).points

        print("\ndense:")
        print([
            result.payload["chunk_id"]
            for result in dense
        ])

        reranked = reranker.rerank(
            question,
            dense,
            top_k=10
        )

        print("reranked:")
        print([
            result["chunk_id"]
            for result in reranked
        ])

        for k in dense_results:

            dense_results[k].append(
                check_recall(
                    dense,
                    relevant_chunks,
                    k
                )
            )

        for k in reranked_results:

            reranked_results[k].append(
                check_recall(
                    reranked,
                    relevant_chunks,
                    k
                )
            )
            
    print("reranker evaluation summary")

    total = len(test_cases)

    print("\ndense retrieval:")

    for k, results in dense_results.items():

        hits = sum(results)
        recall = hits / total * 100

        print(
            f"recall@{k:<2}: "
            f"{hits}/{total} "
            f"({recall:.2f}%)"
        )

    print("\ndense + reranker:")

    for k, results in reranked_results.items():

        hits = sum(results)
        recall = hits / total * 100

        print(
            f"recall@{k:<2}: "
            f"{hits}/{total} "
            f"({recall:.2f}%)"
        )


if __name__ == "__main__":
    main()