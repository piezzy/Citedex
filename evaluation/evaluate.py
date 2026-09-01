import json
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
sys.path.append(str(ROOT_DIR))

from app.rag.rag import RAG


def load_test_cases():
    path = ROOT_DIR / "evaluation" / "test_cases.json"

    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def evaluate_answer(answer, test_case):
    answer_lower = answer.lower()

    test_type = test_case.get("type", "keyword")
    expected = test_case["expected"]

    if test_type == "keyword":
        return all(
            keyword.lower() in answer_lower
            for keyword in expected
        )

    elif test_type == "negative":
        has_subject = expected[0].lower() in answer_lower

        negative_patterns = [
            "tidak",
            "tidak ada",
            "tidak tersedia",
            "tidak disebut",
            "tidak disebutkan",
            "tidak dijelaskan",
            "tidak menggunakan",
            "tidak digunakan",
            "no mention",
            "not mentioned",
            "not available",
            "not used",
            "does not use",
            "there is no mention"
        ]

        has_negative = any(
            pattern in answer_lower
            for pattern in negative_patterns
        )

        return has_subject and has_negative

    return False


def main():
    print("RAG evaluation script")

    rag = RAG()
    test_cases = load_test_cases()

    passed = 0

    for i, test_case in enumerate(test_cases, start=1):

        question = test_case["question"]

        print(f"\n[{i}/{len(test_cases)}]")
        print(f"question: {question}")

        answer, sources = rag.ask(question)

        success = evaluate_answer(
            answer,
            test_case
        )

        if success:
            passed += 1
            status = "PASS"
        else:
            status = "FAIL"

        print(f"status: {status}")
        print(f"expected: {test_case['expected']}")
        print(f"answer: {answer[:300]}...")

    total = len(test_cases)
    accuracy = (passed / total) * 100

    print("\n" + "=" * 60)
    print("evaluation summary")
    print("=" * 60)

    print(f"Passed   : {passed}/{total}")
    print(f"Failed   : {total - passed}/{total}")
    print(f"Accuracy : {accuracy:.2f}%")


if __name__ == "__main__":
    main()