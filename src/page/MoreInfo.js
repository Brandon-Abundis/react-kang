import React, { useState } from "react";
import { auth, db } from "../backend/firebase";
import { collection, addDoc } from "firebase/firestore";
import { data } from "../backend/data";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  //const [notice, setNotice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userRank, setUserRank] = useState("");
  const [userOrg, setUserOrg] = useState("");

  const sendUserData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, `UserData/${auth.currentUser.uid}`), {
        firstName: firstName,
        lastName: lastName,
        userRank: userRank,
        userOrg: userOrg,
        canGrade: false,
        awardGrades: {}
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // console.log(userRank);
  // if (userRank === "") {
  //   console.log("rank is empty");
  // }
  // console.log(auth.currentUser.uid)

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form className="col-md-4 mt-3 pt-3 pb-3">
          {/*
          {"" !== notice && (
            <div className="alert alert-warning" role="alert">
              {notice}
            </div>
          )}
          */}
          <div className="col-md-4 text-center">
            <p className="lead">Information</p>
          </div>

          <div className="form-floating mb-3">
            <input
              id="name"
              type="text"
              className={`form-select ${firstName === "" ? "is-invalid" : ""}`}
              placeholder="Min"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="lastname"
              type="text"
              className={`form-select ${lastName === "" ? "is-invalid" : ""}`}
              placeholder="Kang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="userRank"
              className={`form-select ${userRank === "" ? "is-invalid" : ""}`}
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
              Select Rank:
            </label>
          </div>

          <div className="form-floating mb-3">
            <select
              id="userOrg"
              className={`form-select ${userOrg === "" ? "is-invalid" : ""}`}
              value={userRank}
              onChange={(e) => setUserOrg(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {data._organization.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <label htmlFor="userRank" className="form-label">
              Select Organization:
            </label>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserInfo;