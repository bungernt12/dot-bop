import React, { useState, useEffect } from "react";
import GameLobby from "./GameLobby";
import bopSound from "./Bop-Sound.mp3";

const squareSize = { width: 300, height: 500 };

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  const [dotSide, setDotSide] = useState("top");

  const bopSoundObj = new Audio(bopSound);

  const dotClickHandle = () => {
    bopSoundObj.play();

    let newTop, newLeft;
    do {
      newTop = Math.random() * (squareSize.height - 70);
      newLeft = Math.random() * (squareSize.width - 70);
    } while (
      (dotLocation.top <= 250 && newTop <= 250) ||
      (dotLocation.top > 250 && newTop > 250) ||
      (newTop > 180 && newTop < 250)
    );

    setDotLocation({ top: newTop, left: newLeft });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => prev + 1);
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
    props.setBopCount(0); // Reset bop count when toggling game running state
  };

  useEffect(() => {
    dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  }, [dotLocation]); // Removed `dotSide` from the dependency array to avoid unnecessary effect triggers

  return (
    <div className="playingSquare">
      {props.gameRunning ? (
        <div>
          <div className="centerLine"></div>
          <button
            className="dot"
            onClick={dotClickHandle}
            style={{
              top: `${dotLocation.top}px`,
              left: `${dotLocation.left}px`,
              backgroundColor: dotColor,
            }}
          >
            :D
          </button>
        </div>
      ) : (
        <GameLobby
          toggleGameRunning={toggleGameRunning}
          gameTitle="Battle"
          bopCount={props.bopCount}
        />
      )}
    </div>
  );
};

export default PlayingField;
