import React, { useEffect, useState } from "react";
import { auth, db } from "../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import PDFUploader from "./PDFUploader";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function Profile() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [score, setScore] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPdfUrl(docSnap.data().pdf);
        setScore(docSnap.data().score); // Assuming you have a field named 'score' in your Firestore document
      } else {
        console.error("No such document!");
      }
    };

    fetchDocument();
  }, [refresh]); // Depend on the refresh state

  const handleUploadSuccess = () => {
    setRefresh(!refresh); // Toggle the refresh state to trigger re-fetching the document
  };

  return (
    <div className="container mb-4 mt-1 ms-auto me-auto">
      <PDFUploader onUploadSuccess={handleUploadSuccess} />
      <p>{pdfUrl}</p>
      <div>
        <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '770px' }}>
          {pdfUrl !== null && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          )}
        </div>
      </div>
      {score !== null ? (
        <p>Score: {score}</p>
      ) : (
        <p>No score yet. Score is still being worked on.</p>
      )}
    </div>
  );
}

export default Profile;
