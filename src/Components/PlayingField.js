import React, { useState } from "react";

const PlayingField = (props) => {
  const [dotLocation, setDotLocation] = useState({ top: 0, left: 0 });
  const [dotColor, setDotColor] = useState("darkgreen");
  //   const [dotSide, setDotSide] = useState("top");

  const dotClickHandle = () => {
    const squareSize = { width: 300, height: 500 };
    const newTop = Math.random() * (squareSize.height - 50);
    const newLeft = Math.random() * (squareSize.width - 50);
    setDotLocation({ top: newTop, left: newLeft });
    newTop > 225 ? setDotColor("darkcyan") : setDotColor("darkgreen");
    props.setBopCount((prev) => (prev = prev + 1));
  };

  const toggleGameRunning = () => {
    props.setGameRunning((prev) => !prev);
  };

  //   useEffect(() => {
  //     console.log("New dot location:", dotLocation);
  //     //whenever the dot location changes, I want the dotSide to update.
  //     dotLocation.top > 225 ? setDotSide("bottom") : setDotSide("top");
  //   }, [dotLocation, dotSide]);

  return (
    <div
      className="playingSquare"
      style={{
        position: "relative",
        width: "300px",
        height: "500px",
        border: "1px solid black",
      }}
    >
      {props.gameRunning ? (
        <div>
          <div
            className="centerLine"
            style={{
              position: "absolute",
              top: 250,
              width: "100%",
              height: 1,
              border: "1px solid red",
            }}
          ></div>
          <button
            className="dot"
            onClick={dotClickHandle}
            style={{
              position: "absolute",
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
