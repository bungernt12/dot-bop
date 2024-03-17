import React from "react";
import { useNavigate } from "react-router-dom";

const GameLobby = (props) => {
  const handleGameModeChange = (e) => {
    props.setGameMode(e.target.value);
  };

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="gameLobby">
      <h3 className="gameLobbyTitle">
        Bop Dot
        <br />
        {props.gameTitle}
      </h3>
      {props.gameTitle === "Co-Op" ? (
        <div className="coOpModeSelectionDiv">
          <h5>Co-Op Mode</h5>
          <form>
            <label>
              <input
                type="radio"
                name="gameMode"
                value="Ping-Pong"
                checked={props.gameMode === "Ping-Pong"}
                onChange={handleGameModeChange}
              />
              Ping-Pong
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="gameMode"
                value="Random"
                checked={props.gameMode === "Random"}
                onChange={handleGameModeChange}
              />
              Random
            </label>
          </form>
        </div>
      ) : !isNaN(props.greenReactionTime) ? (
        <div>
          <h4>Reaction Time Average:</h4>
          <p>Green: {props.greenReactionTime.toFixed(2)} s</p>
          <p>Blue: {props.blueReactionTime.toFixed(2)} s</p>
        </div>
      ) : (
        ""
      )}
      {/* <h3>Bops: {props.bopCount}</h3> */}
      <button className="goHomeButton button" onClick={handleGoHome}>
        Home Page
      </button>
      <br />
      <br />
      <button className="startButton button" onClick={props.toggleGameRunning}>
        Start Game
      </button>
    </div>
  );
};

export default GameLobby;
