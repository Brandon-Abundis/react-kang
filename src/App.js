import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [fileURLs, setFileURLs] = useState([]);

  const imagesListRef = ref(storage, 'images/');
  
  const uploadFile = () => {
    if (imageUpload == null) return; // Didn't select any images

    // getting a reference to from firebase, and a filepath with filename.
    // the filename has a uuid function to add a random number at the end.

    let arr = imageUpload.name.split(".");
    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    const imageRef = ref(storage, `images/${arr[0]+v4() +"."+arr[1]}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileURLs((prev) => [...prev, url]).then(() => {
          console.log(prev)
          alert('File Uploaded');
        });
      });
    });
    console.log(imageRef)
  };
  

  // Get all the items in the storage reference, then loop through
  // each item and grab them. Then get the url based on that current
  // item, then to add to an item to a list that is a state, you get
  // the current value of the list then set it equal to the same list
  // but add the new url at the end.
  useEffect(() => {
    
    const fetchImages = async () => {

      let result = await listAll(imagesListRef);
      let urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef))
      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFileURLs(urls);
    };
    loadImages();
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {
      fileURLs.map((url) => {
        return <img src={url} />;
      })
      }
    </div>
  );
}

export default App;
