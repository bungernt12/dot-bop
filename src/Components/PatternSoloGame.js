import React, { useState } from "react";
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

// Realign dotConfig for the correct visual orientation
const dotConfig = [
  [
    { color: "red", pitch: "C4" },
    { color: "orange", pitch: "D4" },
    { color: "yellow", pitch: "E4" },
  ],
  [
    { color: "green", pitch: "G4" },
    { color: "blue", pitch: "A4" },
  ],
  [{ color: "purple", pitch: "C5" }],
];

const PatternSoloPlayingField = () => {
  const [activeDots, setActiveDots] = useState({});

  // Function to toggle a dot's active state
  const toggleDotActive = (rowIndex, dotIndex, isActive) => {
    const dotKey = `${rowIndex}-${dotIndex}`;
    setActiveDots(prevState => ({ ...prevState, [dotKey]: isActive }));
  };

  // Plays a note and activates the corresponding dot visually
  const playAndActivateDot = (pitch) => {
    // Iterates over each row and dot to find the one with the matching pitch
    dotConfig.some((row, rowIndex) => row.some((dot, dotIndex) => {
      if (dot.pitch === pitch) {
        // Found the dot, now activate it visually
        toggleDotActive(rowIndex, dotIndex, true);
        // Play the corresponding note with the Tone.js synthesizer
        synth.triggerAttackRelease(pitch, "32n");
        // Schedule deactivation of the dot's visual activation after a delay
        setTimeout(() => toggleDotActive(rowIndex, dotIndex, false), 200);
        return true; // Stop the search as we've found and processed the dot
      }
      return false;
    }));
  };

  const handleDotActivate = (rowIndex, dotIndex) => {
    const { pitch } = dotConfig[rowIndex][dotIndex];
    playAndActivateDot(pitch);
  };

  // const generateAndPlayRandomSequence = (seqLength) => {
  //   const flattenedDots = dotConfig.flat(2);
  //   for (let i = 0; i < seqLength; i++) {
  //     const randomDotIndex = Math.floor(Math.random() * flattenedDots.length);
  //     setTimeout(() => playAndActivateDot(flattenedDots[randomDotIndex].pitch), i * 500);
  //   }
  // };

    //1. add note to challengeSequence
  //2. listen to see if userEnteredSequence is the same as challengeSequence
  //3. repeat
  const [challengeSequence, setChallengeSequence] = useState([0])
  const userEnteredSequence = []

  const  addNoteToChallengeSequenceAndActivateDot = () => {
    const flattenedDots = dotConfig.flat(2);
    const randomDotIndex = Math.floor(Math.random() * flattenedDots.length);
    setChallengeSequence((prev) => [...prev, randomDotIndex])
    challengeSequence.forEach((challengeDot, iterationIndex) => {
      setTimeout(() => playAndActivateDot(flattenedDots[challengeDot].pitch), iterationIndex * 500)
    })
  };

  const startSimonPatternGame = () => {
    addNoteToChallengeSequenceAndActivateDot();
    //play challenge sequence
    console.log(challengeSequence)
    // with every click, check to see if the user entered sequence 
    //matches the challenge sequence up to that point.
  }

  return (
    <div className="playingRectangle simon">
      {dotConfig.map((row, rowIndex) => (
        <div key={rowIndex} className="simonRow">
          {row.map((dot, dotIndex) => (
            <div
              key={dotIndex}
              className="dot dotSimon"
              style={{ filter: activeDots[`${rowIndex}-${dotIndex}`] ? 'brightness(50%)' : 'none', backgroundColor: dot.color }}
              onClick={() => handleDotActivate(rowIndex, dotIndex)}
            ></div>
          ))}
        </div>
      ))}
      <button className="testButton" onClick={() => startSimonPatternGame()}>Test Generate Challenge</button>
    </div>
  );
};

export default PatternSoloPlayingField;
