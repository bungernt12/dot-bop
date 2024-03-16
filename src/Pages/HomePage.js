import React from "react"
import {Link} from 'react-router-dom';

const HomePage = (props) => {
  return (
    <div>
        <h1>BOP DOT</h1>
        <h2>Game Modes</h2>
      <Link to={'/CoOp'}>
        <div className="modeButton">Co-Op</div>
      </Link>
      <Link to={'/Battle'}>
        <div className="modeButton">Battle</div>
      </Link>
    </div>
  )
};

export default HomePage;
