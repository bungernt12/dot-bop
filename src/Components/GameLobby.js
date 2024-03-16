import React from "react";

const GameLobby = (props) => {
  return (
    <div className="gameLobby">
      <h3 className="gameLobbyTitle">
        Bop Dot
        <br />
        {props.gameTitle}
      </h3>
      <h5>Co-Op Mode</h5>
      <form>
        <label>
          <input type="radio" name="gameMode" value="Ping-Pong" />Ping-Pong 
        </label>
        <br/>
        <label>
          <input type="radio" name="gameMode" value="Random" />Random
        </label>
      </form>
      {/* <h3>Bops: {props.bopCount}</h3> */}
      <button className="startButton" onClick={props.toggleGameRunning}>
        Start Game
      </button>
    </div>
  );
};

export default GameLobby;
