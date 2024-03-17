import React, { useState } from "react";
import GameLobby from "./GameLobby";
import bopSound from "./Bop-Sound.mp3";

const squareSize = { width: 300, height: 500 };
let timeTracker,
  greenTimeTracker = 0,
  blueTimeTracker = 0,
  greenBopTracker = 0,
  blueBopTracker = 0;

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState(() => {
    let top, left;
    do {
      top = Math.random() * (squareSize.height - 70);
      left = Math.random() * (squareSize.width - 70);
    } while (top > 180 && top < 250); // Exclude the zone between top 180 and 250
    return { top, left };
  });
  const [dotColor, setDotColor] = useState("darkgreen");
  // const [dotSide, setDotSide] = useState("top");

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

    //how much time has passed since last click/start
    const timeElapsed = Date.now() - timeTracker;
    //add elapsed time to correct time tracker. assuming this is ping-pong style, if the new top of the dot is lower than 250, the old must have been higher than 250, so the elapsed time should be added to the blue side
    if (newTop < 250) {
      blueTimeTracker += timeElapsed;
      blueBopTracker++;
    } else {
      greenTimeTracker += timeElapsed;
      greenBopTracker++;
    }

    console.log(
      greenTimeTracker,
      greenBopTracker,
      blueTimeTracker,
      blueBopTracker
    );

    timeTracker = Date.now();

    setDotLocation({ top: newTop, left: newLeft });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => prev + 1);
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
    props.setBopCount(0); // Reset bop count when toggling game running state
    timeTracker = Date.now();
    greenTimeTracker = 0;
    blueTimeTracker = 0;
    greenBopTracker = 0;
    blueBopTracker = 0;
  };

  // useEffect(() => {
  //   // dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  // }, [dotLocation]); // Removed `dotSide` from the dependency array to avoid unnecessary effect triggers

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
          gameTitle="Battle"
          bopCount={props.bopCount}
          greenReactionTime={greenTimeTracker / (greenBopTracker * 1000)}
          blueReactionTime={blueTimeTracker / (blueBopTracker * 1000)}
        />
      )}
    </div>
  );
};

export default PlayingField;
