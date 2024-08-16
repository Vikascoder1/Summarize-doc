from transformers import pipeline
import fitz  # PyMuPDF
from docx import Document

# Initialize the summarization pipeline with a smaller model
summarizer = pipeline("summarization", model="t5-small")

def extract_text(file_path: str) -> str:
    try:
        if file_path.endswith(".pdf"):
            return extract_text_from_pdf(file_path)
        elif file_path.endswith(".docx"):
            return extract_text_from_docx(file_path)
        elif file_path.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()
        else:
            raise Exception("Unsupported file type")
    except Exception as e:
        raise Exception(f"Error reading file: {str(e)}")

def extract_text_from_pdf(file_path: str) -> str:
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        raise Exception(f"Error reading PDF file: {str(e)}")

def extract_text_from_docx(file_path: str) -> str:
    try:
        doc = Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        raise Exception(f"Error reading DOCX file: {str(e)}")

def summarize_document(file_name: str) -> str:
    try:
        file_path = f"uploads/{file_name}"
        text = extract_text(file_path)

        # Generate a summary using the summarization pipeline
        summary = summarizer(text, max_length=300, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        raise Exception(f"Error reading file or generating summary: {str(e)}")


# from transformers import pipeline

# # Initialize the summarization pipeline once and reuse it
# summarizer = pipeline("summarization", model="t5-small")

# def summarize_document(file_name: str) -> str:
#     try:
#         # Read and process the file
#         with open(file_name, "r", encoding="utf-8") as file:
#             text = file.read()
        
#         # Summarize the text
#         summary = summarizer(text, max_length=150, min_length=30, do_sample=False)
#         return summary[0]['summary_text']
#     except Exception as e:
#         raise RuntimeError(f"Error reading file or generating summary: {e}")
