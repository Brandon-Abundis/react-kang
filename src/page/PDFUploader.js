import React,{useState} from "react";
import {auth, db, storage} from "../backend/firebase";
import { ref, 
  //uploadBytes,
   getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Document, Page } from "react-pdf";
import { Button, ProgressBar } from "react-bootstrap";
import { updateDoc, doc } from "firebase/firestore";

const PDFUploader = () => {
    const [file, setFile] = useState(null); // the selected file
    const [url, setUrl] = useState(null); // the download url of the uploaded file
    const [progress, setProgress] = useState(0); // the upload progress
    const [error, setError] = useState(null); // the upload error
  
    // handle file selection
    const handleChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please select a PDF file");
      }
    };
  
    // handle file upload
    const handleUpload = () => {
      if (file) {
        // create a unique file name using user id and random number
        const fileName = `${auth.currentUser.uid}-${Math.floor(Math.random() * 1000000)}.pdf`;
        // create a reference to the storage location
        const storageRef = ref(storage, `pdfs/${fileName}`);
        // start the upload task
        const uploadTask = uploadBytesResumable(storageRef, file);
        // listen to the state changes
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // calculate the upload progress
            const percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
          },
          (err) => {
            // handle upload error
            setError(err.message);
          },
          () => {
            // get the download url of the uploaded file
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUrl(downloadURL);
              const dbRef = doc(db, "users", auth.currentUser.uid);
              updateDoc(dbRef,{
                pdf: downloadURL,
              });
              // save the file location to the user's document in firestore
              // you can use your own logic here
              // collection(db, "users")
              //   .doc(auth.currentUser.uid)
              //   .update({
              //     pdf: downloadURL,
              //   })
              //   .then(() => {
              //     console.log("File location saved");
              //   })
              //   .catch((err) => {
              //     console.error(err.message);
              //   });
            });
          }
        );
      } else {
        setError("No file selected");
      }
    };
  
    return (
      <div className="pdf-uploader">
        <h1>PDF Uploader</h1>
        <input type="file" onChange={handleChange} accept="application/pdf" />
        {error && <p className="error">{error}</p>}
        {file && (
          <div className="upload-info">
            <p>File name: {file.name}</p>
            <p>File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        )}
        {progress > 0 && (
          <ProgressBar
            animated
            variant="success"
            now={progress}
            label={`${progress.toFixed(0)}%`}
          />
        )}
        {url && (
          <div className="pdf-viewer">
            <h2>PDF Viewer</h2>
            <Document file={url}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </div>
    );
  };
  
  export default PDFUploader;
  