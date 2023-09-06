import { Route, Routes } from 'react-router-dom';
import './application.bootstrap.scss'
import Navigation from './Navigation.js'
import Home from './Home.js'
import AddCharacter from './AddCharacter';
import Test from './Test';
import QuestionCreator from './QuestionCreator';
import CharacterEditor from './CharacterEditor';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Character Recognition Test</h1>
        <Navigation/>
      </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addCharacter" element={<AddCharacter />} />
      <Route path="/test" element={<Test/>} />
      <Route path="/createQuestion" element={<QuestionCreator/>} />
      <Route path="/editor" element={<CharacterEditor/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </div>
  );
}

export default App;
