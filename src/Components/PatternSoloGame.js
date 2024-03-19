import React, { useState } from "react";
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
  const [activeDots, setActiveDots] = useState({});

  const playNote = (pitch, rowIndex, dotIndex) => {
    // Play the note
    synth.triggerAttackRelease(pitch, "32n");
    
    // Activate the dot visually
    const dotKey = `${rowIndex}-${dotIndex}`;
    setActiveDots(prevState => ({...prevState, [dotKey]: true}));
    
    // Set a timeout to deactivate the dot visually
    setTimeout(() => {
      setActiveDots(prevState => ({...prevState, [dotKey]: false}));
    }, 200); // Adjust the timing as needed
  };

  const handleDotClick = (pitch, rowIndex, dotIndex) => {
    playNote(pitch, rowIndex, dotIndex);
  };

    //make a random pattern generator for the function above to play
    const generateRandomSequence = (seqLength) => {
      const randomSequence = []
      for (let i = 0; i < seqLength; i++) {
        const nextNumber = Math.floor(Math.random() * 6);
        randomSequence.push(nextNumber);
      }
      console.log(randomSequence);
    }

  const handleTestPattern = () => {
    // Define your pattern: for example, the first dot of each row
    const pattern = [dotConfig[0][0], dotConfig[1][0], dotConfig[2][0]];
    
    // Play each note in the pattern with a delay
    pattern.forEach((note, index) => {
      const delay = index * 500; // Delay between notes
      const { pitch } = note;
      const rowIndex = index; // Simplified for this example; adjust based on your actual pattern
      const dotIndex = 0; // Assuming each note is the first in its row for simplicity
      setTimeout(() => playNote(pitch, rowIndex, dotIndex), delay);
    });

    generateRandomSequence(6);
  };


  
  //make some kind of listener to play a note and see if plays back the right note

  return (
    <div className="playingRectangle simon">
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
      <button className="testButton" onClick={handleTestPattern}>Test Pattern</button>
    </div>
  );
};

export default PatternSoloPlayingField;
