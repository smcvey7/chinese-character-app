import { Route, Routes, useNavigate } from 'react-router-dom';
import './application.bootstrap.scss'
import Navigation from './Navigation.js'
import Home from './Home.js'
import AddCharacter from './AddCharacter';
import Test from './Test';
import QuestionCreator from './QuestionCreator';
import CharacterEditor from './CharacterEditor';
import GetStarted from './GetStarted';
import React, {useContext, useEffect} from 'react';
import MyContext from './MyContext';

function App() {
  const {user, setUser} = useContext(MyContext)
  const {setActivities} = useContext(MyContext)
  const navigate = useNavigate()

  // auto-login
  useEffect(()=>{
    const path = window.location.pathname
    fetch('/me')
    .then((r)=>{
      if (r.ok){
        r.json()
        .then((user)=>{
          setUser(user)
          navigate(path)
        })
      }
    })
  }, [navigate, setUser])

  return (
    <div className="App">
      <div>
        <h1>Character Recognition Test</h1>
        <Navigation/>
      </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test/>} />
      <Route path="/editor" element={<CharacterEditor/>}/>
      <Route path="/getstarted" element={<GetStarted/>}/>
    </Routes>
    </div>
  );
}

export default App;
