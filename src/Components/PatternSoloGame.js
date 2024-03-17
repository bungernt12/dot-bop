const PatternSoloPlayingField = (props) => {
  const handleDotClick = () => {
    console.log("dot clicked");
  };

  return (
    <div className="playingRectangle simon">
      <div className="simonRow">
        <div
          className="dot dotSimon"
          style={{ backgroundColor: "purple" }}
          onClick={handleDotClick}
        ></div>
      </div>
      <div className="simonRow">
        <div
          className="dot dotSimon"
          style={{ backgroundColor: "green" }}
        ></div>
        <div className="dot dotSimon" style={{ backgroundColor: "blue" }}></div>
      </div>
      <div className="simonRow">
        <div className="dot dotSimon" style={{ backgroundColor: "red" }}></div>
        <div
          className="dot dotSimon"
          style={{ backgroundColor: "orange" }}
        ></div>
        <div
          className="dot dotSimon"
          style={{ backgroundColor: "yellow" }}
        ></div>
      </div>
    </div>
  );
};

export default PatternSoloPlayingField;
