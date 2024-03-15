import React, { useState, useEffect } from "react";
import GameLobby from "./GameLobby";
import bopSound from "./Bop-Sound.mp3";
import Dot from "./Dot";

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  const [dotSide, setDotSide] = useState("top");

  const bopSoundObj = new Audio(bopSound);

  const dotClickHandle = () => {
    bopSoundObj.play();

    const squareSize = { width: 300, height: 500 };
    const newTop = Math.random() * (squareSize.height - 70);
    if (newTop > 180 && newTop < 250) {
      dotClickHandle();
      return;
    }
    const newLeft = Math.random() * (squareSize.width - 70);
    setDotLocation({ top: newTop, left: newLeft });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => (prev = prev + 1));
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
    props.setBopCount(0);
  };

  

  useEffect(() => {
    // console.log("New dot location:", dotLocation);
    //whenever the dot location changes, I want the dotSide to update.
    dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  }, [dotLocation, dotSide]);

  return (
    <div className="playingSquare">
      {props.gameRunning ? (
        <div>
          <div className="centerLine"></div>
          <Dot
            className="dot"
            onClick={dotClickHandle}
            style={{
              top: `${dotLocation.top}px`,
              left: `${dotLocation.left}px`,
              backgroundColor: dotColor,
            }}
          />
          {/* <button
            className="dot"
            onClick={dotClickHandle}
            style={{
              top: `${dotLocation.top}px`,
              left: `${dotLocation.left}px`,
              backgroundColor: dotColor,
            }}
          >
            :D
          </button> */}
        </div>
      ) : (
        <GameLobby
          toggleGameRunning={toggleGameRunning}
          gameTitle={"Co-Op"}
          bopCount={props.bopCount}
        />
      )}
    </div>
  );
};

export default PlayingField;
