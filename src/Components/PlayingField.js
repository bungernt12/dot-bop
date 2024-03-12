import React, { useState, useEffect } from "react";

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  const [dotSide, setDotSide] = useState("top");

  const dotClickHandle = () => {
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
    console.log("start game clicked1");
    props.setGameRunning((prev) => !prev);
    console.log("start game clicked2");
    props.setBopCount(0);
    console.log("start game clicked3");
  };

  useEffect(() => {
    // console.log("New dot location:", dotLocation);
    //whenever the dot location changes, I want the dotSide to update.
    dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  }, [dotLocation, dotSide]);

  return (
    <div className="playingSquare">
      <div className="centerLine"></div>
      {props.gameRunning ? (
        <div>
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
        <button className="startButton" onClick={toggleGameRunning}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default PlayingField;
