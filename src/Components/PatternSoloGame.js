import React, { useState, useCallback, useEffect } from "react";
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
  const [challengeSequence, setChallengeSequence] = useState([]);
  const [userEnteredSequence, setUserEnteredSequence] = useState([]);
  const [challengePlaying, setChallengePlaying] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  // Function to toggle a dot's active state
  const toggleDotActive = (rowIndex, dotIndex, isActive) => {
    const dotKey = `${rowIndex}-${dotIndex}`;
    setActiveDots(prevState => ({ ...prevState, [dotKey]: isActive }));
  };

  // Plays a note and activates the corresponding dot visually
  const playAndActivateDot = useCallback((pitch) => {
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
  }, []);

  const handleDotActivate = useCallback((rowIndex, dotIndex) => {
    if (challengePlaying) return; // Ignore clicks while challenge is playing
    const dot = dotConfig[rowIndex][dotIndex];
    playAndActivateDot(dot.pitch);
    // This adjustment ensures the first dot click is added to the sequence
    if (!challengePlaying) {
      setUserEnteredSequence(prev => [...prev, dotConfig.flat().indexOf(dot)]);
    }
  }, [challengePlaying, playAndActivateDot ]);

  //Check game-over conditions
  useEffect(() => {
    const triggerGameOver = (type) => {
        if (type === 'wrongNote') {
          const flattenedDots = dotConfig.flat(2)
          const correctDot = flattenedDots[challengeSequence[userEnteredSequence.length - 1]].color;
          alert(`FAILURE! The next dot was ${correctDot}. Final Score: ${challengeSequence.length-1}`)
        }
        if (type === 'tooManyNotes') {
          alert(`FAILURE! You bopped too many dots! Final Score: ${challengeSequence.length-1}`)
        }
        setGameRunning(false)
        setChallengeSequence([])
    }
    
    if(gameRunning) {
      const arrayMatchBool = challengeSequence.slice(0, userEnteredSequence.length).every((value, index) => value === userEnteredSequence[index])
      if (!arrayMatchBool) {
        triggerGameOver('wrongNote');
      }
      if (userEnteredSequence.length > challengeSequence.length) {
        triggerGameOver('tooManyNotes');
      }
      }  ;
  }, [userEnteredSequence, gameRunning, challengeSequence])
  
  
  
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
 
  const  addNoteToChallengeSequenceAndActivateDot = () => {
    setChallengePlaying(true);
    const flattenedDots = dotConfig.flat(2);
    const randomDotIndex = Math.floor(Math.random() * flattenedDots.length);
    setChallengeSequence((prev) => [...prev, randomDotIndex])
  };

  useEffect(() => {
    challengeSequence.forEach((challengeDot, iterationIndex) => {
      const flattenedDots = dotConfig.flat(2);
      setTimeout(() => playAndActivateDot(flattenedDots[challengeDot].pitch), iterationIndex * 500)
    })
    setTimeout(() => setChallengePlaying(false), challengeSequence.length * 500)
    setUserEnteredSequence([])
  }, [challengeSequence, playAndActivateDot])

  const startSimonPatternGame = () => {
    setGameRunning(true);
    addNoteToChallengeSequenceAndActivateDot();
    //play challenge sequence
    // with every click, check to see if the user entered sequence 
    //matches the challenge sequence up to that point.
  }

  // useEffect(() => {

  // }, [challengeSequence])

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
      <button className="testButton" onClick={() => startSimonPatternGame()}>Add Note to Pattern</button>
    </div>
  );
};

export default PatternSoloPlayingField;
