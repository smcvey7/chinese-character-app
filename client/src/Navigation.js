import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


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
        to="/createQuestion"
        className="btn btn-lg custom-button"
        role="button"
      >
        Create Question
      </Link>
      <Link
        to="/addCharacter"
        className="btn btn-lg custom-button"
        role="button"
      >
        Add Character
      </Link>
    </nav>
  )
}

export default Navigation