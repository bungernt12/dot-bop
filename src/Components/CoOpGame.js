import React, { useState, useEffect } from "react";
import GameLobby from "./GameLobby";
import bopSound from "./Bop-Sound.mp3";

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  const [dotSide, setDotSide] = useState("top");
  const [coOpMode, setCoOpMode] = useState("Random");

  const bopSoundObj = new Audio(bopSound);
  // const squareSize = { width: 300, height: 500 };

  const dotClickHandle = () => {
    bopSoundObj.play();
    console.log(window.innerWidth);

    // const oldTop = dotLocation.top;

    let newTop;
    let newLeft = Math.random() * 100;

    //now I want to code the same logic below but in terms of percentage of the screen

    // Ensure the new position crosses the boundary for Ping-Pong mode
    if (coOpMode === "Ping-Pong") {
      do {
        newTop = Math.random() * 100;
      } while (
        (dotLocation.top <= 50 && newTop <= 50) ||
        (dotLocation.top > 50 && newTop > 50) ||
        (newTop > 30 && newTop < 50) ||
        newTop > 82
      );
    } else {
      do {
        newTop = Math.random() * 100;
      } while ((newTop > 30 && newTop < 50) || newTop > 82); // Avoids the middle section only for non-Ping-Pong mode
    }

    setDotLocation({
      top: newTop,
      left: (newLeft / 100) * (window.innerWidth * 0.65),
    });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => prev + 1);
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
    props.setBopCount(0);
    props.setDisplayGameLobby(false);
    console.log(coOpMode);
  };

  useEffect(() => {
    // console.log("New dot location:", dotLocation);
    //whenever the dot location changes, I want the dotSide to update.
    dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
    console.log("innerWidth adjusted", dotLocation);
  }, [dotLocation, dotSide]);

  return (
    <div className="playingRectangle">
      {props.gameRunning ? (
        <section>
          <div className="centerLine"></div>
          <button
            className="dot dotBop"
            onClick={dotClickHandle}
            style={{
              top: `${dotLocation.top}%`,
              left: `${dotLocation.left}px`,
              backgroundColor: dotColor,
            }}
          >
            :D
          </button>
        </section>
      ) : props.displayGameLobby ? (
        <GameLobby
          toggleGameRunning={toggleGameRunning}
          gameTitle={"Co-Op"}
          bopCount={props.bopCount}
          gameMode={coOpMode}
          setGameMode={setCoOpMode}
        />
      ) : (
        <h1 className="gameOverBopCountDisplay">
          Bops: <br></br>
          {props.bopCount}
        </h1>
      )}
    </div>
  );
};

export default PlayingField;
