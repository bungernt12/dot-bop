import React, { useState, useEffect } from "react";
import GameLobby from "./GameLobby";
import bopSound from "./Bop-Sound.mp3";

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  const [dotSide, setDotSide] = useState("top");
  const [coOpMode, setCoOpMode] = useState("Random");

  const bopSoundObj = new Audio(bopSound);
  const squareSize = { width: 300, height: 500 };

  const dotClickHandle = () => {
    bopSoundObj.play();

    const oldTop = dotLocation.top;

    let newTop;
    let newLeft = Math.random() * (squareSize.width - 70);

    // Ensure the new position crosses the boundary for Ping-Pong mode
    if (coOpMode === "Ping-Pong") {
      do {
        newTop = Math.random() * (squareSize.height - 70);
      } while (
        (dotLocation.top <= 250 && newTop <= 250) ||
        (dotLocation.top > 250 && newTop > 250) ||
        (newTop > 180 && newTop < 250)
      );
    } else {
      do {
        newTop = Math.random() * (squareSize.height - 70);
      } while (newTop > 180 && newTop < 250); // Avoids the middle section only for non-Ping-Pong mode
    }

    setDotLocation({ top: newTop, left: newLeft });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => prev + 1);
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
    props.setBopCount(0);
    console.log(coOpMode);
  };

  useEffect(() => {
    // console.log("New dot location:", dotLocation);
    //whenever the dot location changes, I want the dotSide to update.
    dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  }, [dotLocation, dotSide]);

  return (
    <div className="playingRectangle">
      {props.gameRunning ? (
        <div>
          <div className="centerLine"></div>
          <button
            className="dot dotBop"
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
          gameTitle={"Co-Op"}
          bopCount={props.bopCount}
          gameMode={coOpMode}
          setGameMode={setCoOpMode}
        />
      )}
    </div>
  );
};

export default PlayingField;
