import React, {useContext} from "react";
import MyContext from "./MyContext";

function Home(){
  const {user} = useContext(MyContext)

  return(
    <div>
      <div className="topMargins wide primary-color d-flex flex-column align-items-center justify-content-center">
        <h1>Welcome to the Chinese Character Test!</h1>
        {user ? <></> : <em>Create an account or login to get started.</em>}
      </div>
      <div className="topMargins wide primary-color d-flex flex-column justify-content-center">
        <p>
          This app was designed with three groups of users in mind:
        </p>
        <strong>Researchers</strong>
        <ul>
          <li>Administer pre- and post-assessments to study-participants</li>
          <li>More accurately group participants by ability level </li>
          <li>Download group and individual participant data for further analysis</li>
        </ul>
        <a className="align-right">See more...</a>
        <strong>Teachers</strong>
        <ul>
          <li>Assess incoming student abilities to aid in curriculum-planning </li>
          <li>Follow student progress throughout the course</li>
          <li>Use data to drive your decisions</li>
        </ul>
        <a className="align-right">See more...</a>
        <strong>Students</strong>
        <ul>
          <li>Get an estimate of how many characters you recognize</li>
          <li>Practice and improve your ability to read Chinese quickly and accurately</li>
          <li>Track your progress over time</li>
        </ul>
        <a className="align-right">See more...</a>
      </div>
    </div>
  )
};

export default Home