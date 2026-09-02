from langchain_ollama import ChatOllama

MODEL_NAME = "qwen3:8b"


class LLM:
    def __init__(self):
        self.model = ChatOllama(
            model=MODEL_NAME,
            temperature=0
        )

    def generate(self, prompt: str) -> str:
        response = self.model.invoke(prompt)

        return response.content