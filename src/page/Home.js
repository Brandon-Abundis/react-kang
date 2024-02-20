import React from "react";
import { auth } from "../backend/firebase";
// import { Link } from "react-router-dom";
// import { signOut } from "firebase/auth";

function Home(){
    // const navigate = useNavigate();
    // const user = auth.currentUser;



    // const logoutUser = async ()
    return (
        <div className="ps-5 pe-5">
            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "e3f2fd"}}>
                <div className="container" style={{ backgroundColor: "#e3f2fd" }}>
                    <a className="navbar-brand" href="#">
                        <img
                            src="https://mdbootstrap.com/img/Photos/new-templates/animal-shelter/logo.png"
                            height="70"
                        ></img>
                    </a>
                    <button className="navbar-toggler" type="button">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                    <div className="navbar-nav mr-auto">
                        <a className="nav-link active" href="./profile">
                        Home
                        </a>
                        <a className="nav-link" href="#">
                        Courses
                        </a>
                        <a className="nav-link disabled" href="#">
                        About
                        </a>
                    </div>

                    <div>{auth.currentUser.email}</div>
                    </div>
                </div>
            </nav>
        </div>
     );
}

export default Home;