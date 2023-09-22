import { Route, Routes, useNavigate } from 'react-router-dom';
import './application.bootstrap.scss'
import Navigation from './Navigation.js'
import Home from './Home.js'
import Test from './Test';
import Account from './Account';
import CharacterEditor from './CharacterEditor';
import GetStarted from './GetStarted';
import React, {useContext, useEffect} from 'react';
import MyContext from './MyContext';

function App() {
  const {setUser, setCharacters} = useContext(MyContext)
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

  useEffect(()=>{
    fetch('/characters')
    .then((r)=>{
      if (r.ok){
        r.json()
        .then((characters)=>{
          setCharacters(characters.sort((a, b)=>{
            return a.id - b.id
          })) 
        })
      }
    })
  }, [setCharacters])

  return (
    <div className="App">
      <div className='entire-page'>
        <h1>Chinese Character Recognition Test</h1>
        <Navigation/>
      </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test/>} />
      <Route path="/editor" element={<CharacterEditor/>}/>
      <Route path="/getstarted" element={<GetStarted/>}/>
      <Route path="/account" element={<Account/>}/>
    </Routes>
    </div>
  );
}

export default App;
