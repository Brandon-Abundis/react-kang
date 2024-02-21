import React from "react";
import { auth } from "../backend/firebase";
import { signOut } from "firebase/auth";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {Navbar, Nav, Container} from "react-bootstrap";

function NavLayout(){
    const location = useLocation();
    const navigate = useNavigate();

    
    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="pt-5 ps-5 pe-5">
        <Navbar collapseOnSelect expand="lg" className="bg-dark navbar-dark">
          <Container>
            <Navbar.Brand>
              <img
                src="https://www.spaceforce.mil/Portals/2/ussf_vert_logo_20.png?ver=IYxFTN1prkQMysceaeIW3w%3d%3d"
                height="70"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/site/home"
                  active={location.pathname === "/site/home"}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/site/profile"
                  active={location.pathname === "/site/profile"}
                >
                  Profile
                </Nav.Link>
                <Nav.Link onClick={(e) => logoutUser(e)}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    );
}

export default NavLayout;