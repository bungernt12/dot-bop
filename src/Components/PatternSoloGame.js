import React, { useState } from "react";
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

// Redefine dotConfig in the desired order
const dotConfig = [
  // Start with colors in the order red, orange, yellow
  [
    { color: "red", pitch: "C4" },
    { color: "orange", pitch: "D4" },
    { color: "yellow", pitch: "E4" },
  ],
  // Then green and blue
  [
    { color: "green", pitch: "G4" },
    { color: "blue", pitch: "A4" },
  ],
  // Finally, purple
  [{ color: "purple", pitch: "C5" }],
];

const PatternSoloPlayingField = (props) => {
  const [activeDots, setActiveDots] = useState({});

  const playNote = (pitch, rowIndex, dotIndex) => {
    synth.triggerAttackRelease(pitch, "32n");
    const dotKey = `${rowIndex}-${dotIndex}`;
    setActiveDots(prevState => ({...prevState, [dotKey]: true}));
    
    setTimeout(() => {
      setActiveDots(prevState => ({...prevState, [dotKey]: false}));
    }, 200);
  };

  const handleDotClick = (pitch, rowIndex, dotIndex) => {
    playNote(pitch, rowIndex, dotIndex);
  };

  const generateRandomSequence = (seqLength) => {
    const flattenedDots = dotConfig.flat();
    const randomSequence = Array.from({ length: seqLength }, () => Math.floor(Math.random() * flattenedDots.length));
    const randomSequenceToDotConfig = randomSequence.map(index => flattenedDots[index]);

    console.log("Random Sequence:", randomSequence);
    console.log("Mapped to DotConfig:", randomSequenceToDotConfig);
  
    // Optionally, play the random sequence
    randomSequenceToDotConfig.forEach((dot, index) => {
      setTimeout(() => playNote(dot.pitch, 0, 0), index * 500); // Assuming pitch is enough to play the note
    });

    return randomSequenceToDotConfig; // Return this if needed
  };

  const handleTestPattern = () => {
    generateRandomSequence(6);
  };

  return (
    <div className="playingRectangle simon">
      <div className="simonContainer">
      {dotConfig.map((row, rowIndex) => (
        <div key={rowIndex} className="simonRow">
          {row.map((dot, dotIndex) => (
            <div
              key={dotIndex}
              className="dot dotSimon"
              style={{ filter: activeDots[`${rowIndex}-${dotIndex}`] ? 'brightness(50%)' : 'none', backgroundColor: dot.color }}
              onClick={() => handleDotClick(dot.pitch, rowIndex, dotIndex)}
            ></div>
          ))}
        </div>
      ))}
      </div>
      <button className="testButton" onClick={handleTestPattern}>Test Pattern</button>
    </div>
  );
};

export default PatternSoloPlayingField;
