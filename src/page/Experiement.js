import { useNavigate } from "react-router-dom";
import { auth, storage } from "../backend/firebase";
import { signOut } from "firebase/auth";
import {  useState, useEffect } from 'react';
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const Profile = () => {
    const [fileUpload, setFileUpload] = useState(null);
    // const [fileURLs, setFileURLs] = useState([]);
    const fileListRef = ref(storage, 'files/');

    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    const uploadFile = () => {
      if (fileUpload == null) {
        alert("No File Selected");
        return;
     }

      let refArr = fileUpload.name.split(".");
      const fileRef = ref(storage, `files/${user.uid+"."+refArr[1]}`);

      uploadBytes(fileRef, fileUpload).then(() => {
        alert("File Uploaded");
      });
    }

    return(
        <div className = "container">
            <div className = "row justify-content-center">
                <div className = "col-md-4 text-center">
                    <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. You are logged in!</p>
                    <p>Your ID is <em className = "text-decoration-underline">{ user.uid}</em></p>
                    <p>Upload your pdf file</p>
                    <input type="file" onChange={(event) => {
                        setFileUpload(event.target.files[0]);
                    }}/>
                    <button onClick={uploadFile}>Upload File</button>
                    <div className = "d-grid gap-2">
                        <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => logoutUser(e)}>Logout</button>
                    </div>                
                    <p>Submit your File</p>
                </div>
            </div>
        </div>       
    )    
}

export default Profile