import React from "react";
import { Link } from "react-router-dom";


function Navigation(){
  return(
    <nav className="navbar navbar-dark bg-dark">
      <Link
        to="/"
        className="btn btn-lg custom-button"
        role="button"
      >
        Home
      </Link>
      <Link
        to="/test"
        className="btn btn-lg custom-button"
        role="button"
      >
        Test
      </Link>
      <Link
        to="/editor"
        className="btn btn-lg custom-button"
        role="button"
      >
        Editor
      </Link>
      <Link
        to="/getstarted"
        className="btn btn-lg custom-button"
        role="button"
      >
        Sign up/Login
      </Link>
    </nav>
  )
}

export default Navigation