import React from "react";
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

const dotConfig = [
  [{ color: "purple", pitch: "C5" }], // First row
  [
    { color: "green", pitch: "G4" },
    { color: "blue", pitch: "A4" },
  ], // Second row
  [
    { color: "red", pitch: "C4" },
    { color: "orange", pitch: "D4" },
    { color: "yellow", pitch: "E4" },
  ], // Third row
];

const PatternSoloPlayingField = (props) => {
  const handleDotClick = (pitch) => {
    console.log("dot clicked:", pitch);
    synth.triggerAttackRelease(pitch, "8n");
  };

  return (
    <div className="playingRectangle simon">
      {dotConfig.map((row, rowIndex) => (
        <div key={rowIndex} className="simonRow">
          {row.map((dot, dotIndex) => (
            <div
              key={dotIndex}
              className="dot dotSimon"
              style={{ backgroundColor: dot.color }}
              onClick={() => handleDotClick(dot.pitch)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};
// (
//   <div className="playingRectangle simon">
//     <div className="simonRow">
//       <div
//         className="dot dotSimon"
//         style={{ backgroundColor: "purple" }}
//         onClick={handleDotClick}
//       ></div>
//     </div>
//     <div className="simonRow">
//       <div
//         className="dot dotSimon"
//         style={{ backgroundColor: "green" }}
//       ></div>
//       <div className="dot dotSimon" style={{ backgroundColor: "blue" }}></div>
//     </div>
//     <div className="simonRow">
//       <div className="dot dotSimon" style={{ backgroundColor: "red" }}></div>
//       <div
//         className="dot dotSimon"
//         style={{ backgroundColor: "orange" }}
//       ></div>
//       <div
//         className="dot dotSimon"
//         style={{ backgroundColor: "yellow" }}
//       ></div>
//     </div>
//   </div>
// );
// };

export default PatternSoloPlayingField;
