import os
from fastapi import UploadFile
from pathlib import Path

UPLOAD_DIR = Path("uploaded_files")

async def save_file(file: UploadFile):
    UPLOAD_DIR.mkdir(exist_ok=True)
    file_path = UPLOAD_DIR / file.filename
    with file_path.open("wb") as buffer:
        buffer.write(await file.read())
    return str(file_path)
