from langchain_text_splitters import RecursiveCharacterTextSplitter

def chunk_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=[
            "\n\n",
            "\n",
            " ",
            "",
            ". "
        ]
    )
    
    chunks = []
    
    for document in documents:
        page = document["page"]
        text = document["text"]
        
        split_texts = splitter.split_text(text)
        
        for text_chunk in split_texts:
            chunks.append({
                "chunk_id" : f"chunk_{len(chunks):04d}",
                "text" : text_chunk,
                "meta_data": {
                    "source": "Laporan_Computing_Project_Kelompok_1.pdf",
                    "page": page
                }
            })
            
    return chunks