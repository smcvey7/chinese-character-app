import React, {useContext} from "react";
import MyContext from "./MyContext";
import { Link, useNavigate } from "react-router-dom";

function Navigation(){
  const {user, setUser} = useContext(MyContext)
  const navigate = useNavigate();


  function onLogout(){
    fetch('/logout', {method: "DELETE"}).then((r)=>{
      if (r.ok){
        navigate('/')
        setUser(null)
      }
    })
  }

  return(
    <nav className="navbar navbar-dark bg-dark justify-content-around">
      <Link
        to="/"
        className="btn btn-lg custom-button"
        role="button"
      >
        Home
      </Link>
      {user ? <Link
        to="/test"
        className="btn btn-lg custom-button"
        role="button"
      >
        Test
      </Link> : <></>}
      {user && user.admin ?
      <Link
        to="/editor"
        className="btn btn-lg custom-button"
        role="button"
      >
        Editor
      </Link> : <></>}
      {user ?
      <Link
        to="/account"
        className="btn btn-lg custom-button"
        role="button"
      >
        My Account
      </Link>
      :null
      }
      {!user  ? <Link
        to="/getstarted"
        className="btn btn-lg custom-button"
        role="button"
      >
        Sign up/Login
      </Link> :
      <Link
      className="btn btn-lg custom-button"
      role="button"
      onClick={onLogout}
    >
      Logout
    </Link>}
    </nav>
  )
}

export default Navigation