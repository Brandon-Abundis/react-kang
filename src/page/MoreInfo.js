import React, { useState } from "react";
import { auth } from "../backend/firebase";
import { data } from "../backend/data";

function UserInfo() {
  //const [notice, setNotice] = useState("");
  const [userRank, setUserRank] = useState("");
  const [userOrg, setUserOrg] = useState("");

  console.log(userRank);
  if (userRank === "") {
    console.log("rank is empty");
  }
  console.log(auth.currentUser.uid)

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
              className="form-control"
              placeholder="Min"
            ></input>
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="lastname"
              type="text"
              className="form-control"
              placeholder="Kang"
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

          <div className="form-floating mb-3">
            <select
              className="form-select"
              value={userOrg}
              onChange={(e) => setUserOrg(e.target.value)}
            >
              {data._organization.map((otionp) => (
                <option key={option.name}>{option.name}</option>
              ))}
            </select>
            <label htmlFor="userOrg" className="form-label">
              Select Organization:
            </label>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserInfo;