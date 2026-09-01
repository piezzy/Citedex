from ollama import chat

MODEL_NAME = "qwen3:8b"

class LLM:
    
    def __init__(self):
        self.model = MODEL_NAME
    
    def generate(self, prompt:str) -> str:
        response = chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        return response["message"]["content"]