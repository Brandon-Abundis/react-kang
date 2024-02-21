import React,{useState} from "react";
import {storage} from "../backend/firebase";
import { ref, uploadBytes } from "firebase/storage";

function UploadFile(){
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `pdfs/${file.name}`);

        const uploadTask = uploadBytes(storageRef, file);

        uploadTask.on('state_changed', null, null, () => {
            storageRef.getDownloadURL().then((url) => {
                setPdfUrl(url);
            });
        });
    };
    return(
        <div className="container mt-5">
            <h2>Uplaod and view PDF</h2>
            <input type="file" onChange={handleFileUpload}/>
            {pdfUrl && (
                <embed
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    src={pdfUrl}
                />
            )}
        </div>
    );
}

export default UploadFile;