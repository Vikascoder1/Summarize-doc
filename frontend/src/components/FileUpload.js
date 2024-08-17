import React, { useState } from 'react';

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadError(null); // Clear any previous errors
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const response = await fetch("https://summarize-doc.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const data = await response.json();
      console.log("Upload success:", data);

      // Call the callback to notify parent component about the success
      if (onUploadSuccess) {
        onUploadSuccess(data.filename);
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
      {uploadError && <p style={{ color: 'red' }}>Error: {uploadError}</p>}
    </div>
  );
}

export default FileUpload;
