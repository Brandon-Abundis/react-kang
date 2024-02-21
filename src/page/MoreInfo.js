import React, { useState } from "react";
import { auth, db } from "../backend/firebase";
import { collection, 
  doc, 
  //addDoc,
   setDoc } from "firebase/firestore";
import { data } from "../backend/data";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();

  //const [uid, setUid] = useState("");
  const [notice, setNotice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userRank, setUserRank] = useState("");
  const [userOrg, setUserOrg] = useState("");

  {
    /*
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
    }
  }, []);
*/
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser behavior

    // Check if input fields are valid
    if (!firstName || !lastName || !userRank || !userOrg) {
      setNotice("Please fill in all the fields.");
    } else {
      // try to add a doc tp the firestore collection
      try {
       // await addDoc(collection(db, "users"), {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          canGrade: false,
          firstName: firstName,
          lastName: lastName,
          userRank: userRank,
          userOrg: userOrg,
        });

        // clear input fields
        setFirstName("");
        setLastName("");
        setUserRank("");
        setUserOrg("");

        //alert("Data sent successfully");
        navigate("/site/home");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // requires name field for jsx
  // Handles input changes by using a switch case to scale later
  const handleChange = async (event) => {
    // Get the name and value of ech input field
    const { name, value } = event.target;

    // Update the state variable corresponding to the input field
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;

      case "lastName":
        setLastName(value);
        break;

      case "userRank":
        setUserRank(value);
        break;

      case "userOrg":
        setUserOrg(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit} className="col-md-4 mt-3 pt-3 pb-3">
          {"" !== notice && (
            <div className="alert alert-warning" role="alert">
              {notice}
            </div>
          )}

          <div className="col-md-4 text-center">
            <p className="lead">Information</p>
          </div>

          <div className="form-floating mb-3">
            <input
              id="name"
              name="firstName"
              type="text"
              className={"form-control"}
              value={firstName}
              onChange={handleChange}
            ></input>
            <label htmlFor="firstname" className="form-label">
              First name:
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="lastname"
              name="lastName"
              type="text"
              className={"form-control"}
              value={lastName}
              onChange={handleChange}
            ></input>
            <label htmlFor="lastname" className="form-label">
              Last name:
            </label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="userrank"
              name="userRank"
              className={"form-select"}
              value={userRank}
              onChange={(e) => setUserRank(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {data.rank.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="userRank" className="form-label">
              Rank:
            </label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="userOrg"
              name="userOrg"
              className={"form-select"}
              value={userOrg}
              onChange={handleChange}
            >
              <option value="" disabled hidden></option>
              {data._organization.map((option) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
            <label htmlFor="userOrg" className="form-label">
              Field Command or Delta:
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Send Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;