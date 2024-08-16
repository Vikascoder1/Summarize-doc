// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const uploadResponse = await fetch("https://<your-backend-app>.herokuapp.com/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();

//       const summarizeResponse = await fetch("https://<your-backend-app>.herokuapp.com/api/summarize", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ file_name: uploadData.filename }),
//       });

//       if (summarizeResponse.ok) {
//         const summaryData = await summarizeResponse.json();
//         setSummary(summaryData.summary);
//         setError("");
//       } else {
//         const errorData = await summarizeResponse.json();
//         setError(errorData.detail || "Failed to get summary.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setError("An error occurred while uploading the file.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Document Summarizer</h1>
//       <div className="upload-container">
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload and Summarize</button>
//       </div>
//       {loading && <div className="loader">Loading...</div>}
//       {summary && (
//         <div className="summary-container">
//           <h3>Summary:</h3>
//           <p>{summary}</p>
//         </div>
//       )}
//       {error && <div className="error">{error}</div>}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true); // Show spinner
      setError(""); // Clear any previous errors

      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const summarizeResponse = await fetch("http://localhost:8000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_name: data.filename }),
      });

      if (summarizeResponse.ok) {
        const summaryData = await summarizeResponse.json();
        setSummary(summaryData.summary);
        setError("");
      } else {
        const errorData = await summarizeResponse.json();
        setError(errorData.detail || "Failed to get summary.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while uploading the file.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="App">
      <h1>Document Summarizer</h1>
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload and Summarize</button>
      </div>
      {loading && <div className="spinner"></div>} {/* Show spinner when loading */}
      {summary && (
        <div className="summary-container">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
