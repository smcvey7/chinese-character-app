import React, {useContext} from "react";
import { Link } from "react-router-dom";
import MyContext from "./MyContext";
import { useNavigate } from "react-router-dom";

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