import Reac,{useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
import { auth, db } from "../backend/firebase";
// import { signOut } from "firebase/auth";
//import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {doc, getDoc} from 'firebase/firestore'
import PDFUploader from "./PDFUploader";

import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

function Profile() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger refresh
  
    useEffect(() => {
      const fetchDocument = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setPdfUrl(docSnap.data().pdf);
          console.log(pdfUrl);
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
      <div className="container">
        <PDFUploader onUploadSuccess={handleUploadSuccess} />
        <p>{pdfUrl}</p>
        <div>
          {/* {pdfUrl ? (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              style={{ border: "none" }}
            ></iframe>
          ) : (
            <p>No PDF found</p>
          )} */}
          {/*-----------------------------------------------------*/}
          {/* { pdfUrl !== null&&(
            <>
              <embed type="application/pdf" src={pdfUrl} width={100+'%'} height={100+'%'}/>
            </>
          )} */}
          {/*-----------------------------------------------------*/}
          { pdfUrl !== null&&(
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl}/>
            </Worker>
          )}
          
        </div>
      </div>
    );
  }
  
  export default Profile;