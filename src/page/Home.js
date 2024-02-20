import React from "react";
import { auth } from "../backend/firebase";
import { Link, Outlet, useLocation } from "react-router-dom";

function Home(){
    t

    return (
        <div className="pt-5 ps-5 pe-5">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img
                            src="https://www.spaceforce.mil/Portals/2/ussf_vert_logo_20.png?ver=IYxFTN1prkQMysceaeIW3w%3d%3d"
                            height="70"
                        ></img>
                    </a>
                    <button className="navbar-toggler" type="button">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                    <div className="navbar-nav mr-auto">
                        <Link to="/home" className="nav-link active" id="home-tab">Home</Link>
                        <Link to="home/profile" className="nav-link" id="profile-tab">Profile</Link>
                    </div>

                    <div>{auth.currentUser.email}</div>
                    </div>
                </div>
            </nav>
            <div className="pt-4"><Outlet/></div>
            
        </div>
     );
}

export default Home;