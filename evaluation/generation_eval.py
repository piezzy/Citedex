import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

from app.rag.rag import RAG


TEST_CASES = [
    {
        "id": "GEN-01",
        "question": "Apa framework backend yang digunakan dalam project DRI?"
    },
    {
        "id": "GEN-02",
        "question": "Apa saja teknologi yang digunakan dalam project DRI?"
    },
    {
        "id": "GEN-03",
        "question": "Apa fungsi resolver DRI?"
    },
    {
        "id": "GEN-04",
        "question": "Apakah project DRI menggunakan React.js?"
    },
    {
        "id": "GEN-05",
        "question": "Apa database yang digunakan dalam project DRI?"
    }
]


def evaluate_citation(answer, sources):
    import re

    citations = {
        int(number)
        for number in re.findall(r"\[(\d+)\]", answer)
    }

    available_citations = {
        source["citation"]
        for source in sources
    }

    if not citations:
        return False

    return citations.issubset(available_citations)


def evaluate_grounding(answer, sources):
    if not answer.strip():
        return False

    if not sources:
        return False

    return evaluate_citation(answer, sources)


def main():
    print("generation evaluation")

    rag = RAG()

    results = []

    for i, test_case in enumerate(TEST_CASES, start=1):

        question = test_case["question"]

        print(f"\n[{i}/{len(TEST_CASES)}]")
        print(f"question: {question}")

        answer, sources = rag.ask(question)

        citation_correct = evaluate_citation(
            answer,
            sources
        )

        grounded = evaluate_grounding(
            answer,
            sources
        )

        result = {
            "id": test_case["id"],
            "question": question,
            "answer": answer,
            "grounded": grounded,
            "citation_correct": citation_correct,
            "sources": [
                {
                    "citation": source["citation"],
                    "page": source["page"],
                    "chunk_id": source["chunk_id"]
                }
                for source in sources
            ]
        }

        results.append(result)

        print(f"grounded         : {grounded}")
        print(f"citation correct : {citation_correct}")

    total = len(results)

    grounded_count = sum(
        result["grounded"]
        for result in results
    )

    citation_count = sum(
        result["citation_correct"]
        for result in results
    )

    summary = {
        "evaluation": "generation evaluation",
        "total_test_cases": total,
        "metrics": {
            "grounded_rate": grounded_count / total * 100,
            "citation_correct_rate": citation_count / total * 100
        },
        "results": results
    }

    output_path = (
        ROOT_DIR
        / "evaluation"
        / "results"
        / "generation_results.json"
    )

    with open(
        output_path,
        "w",
        encoding="utf-8"
    ) as file:
        json.dump(
            summary,
            file,
            indent=2,
            ensure_ascii=False
        )

    print("generation evaluation summary")

    print(
        f"grounded rate         : "
        f"{grounded_count}/{total} "
        f"({grounded_count / total * 100:.2f}%)"
    )

    print(
        f"citation correct rate : "
        f"{citation_count}/{total} "
        f"({citation_count / total * 100:.2f}%)"
    )

    print(f"\nresults saved to: {output_path}")
    print("=" * 70)


if __name__ == "__main__":
    main()