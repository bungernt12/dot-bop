import React, { useState, useCallback, useEffect } from "react";
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

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
  const [challengePlaying, setChallengePlaying] = useState(false);
  // Initialize challengeSequence with an empty array for a clear start
  const [challengeSequence, setChallengeSequence] = useState([]);
  const [userEnteredSequence, setUserEnteredSequence] = useState([]);

  const toggleDotActive = useCallback((rowIndex, dotIndex, isActive) => {
    const dotKey = `${rowIndex}-${dotIndex}`;
    setActiveDots(prevState => ({ ...prevState, [dotKey]: isActive }));
  }, []);

  const playAndActivateDot = useCallback((pitch) => {
    dotConfig.some((row, rowIndex) => row.some((dot, dotIndex) => {
      if (dot.pitch === pitch) {
        toggleDotActive(rowIndex, dotIndex, true);
        synth.triggerAttackRelease(pitch, "32n");
        setTimeout(() => toggleDotActive(rowIndex, dotIndex, false), 200);
        return true;
      }
      return false;
    }));
  }, [toggleDotActive]);

  const handleDotActivate = useCallback((rowIndex, dotIndex) => {
    if (challengePlaying) return; // Ignore clicks while challenge is playing
    const dot = dotConfig[rowIndex][dotIndex];
    playAndActivateDot(dot.pitch);
    // This adjustment ensures the first dot click is added to the sequence
    if (!challengePlaying) {
      setUserEnteredSequence(prev => [...prev, dotConfig.flat().indexOf(dot)]);
    }
  }, [challengePlaying, playAndActivateDot]);

  const addChallengeNoteAndPlay = useCallback(() => {
    setChallengePlaying(true);
    const randomDotIndex = Math.floor(Math.random() * dotConfig.flat().length);
    setChallengeSequence(prev => [...prev, randomDotIndex]);

    // Ensure that the updated sequence is played
    const updatedSequence = [...challengeSequence, randomDotIndex];
    updatedSequence.forEach((index, iterationIndex) => {
      setTimeout(() => {
        const dot = dotConfig.flat()[index];
        playAndActivateDot(dot.pitch);
      }, iterationIndex * 500);
    });

    setTimeout(() => {
      setChallengePlaying(false);
    }, updatedSequence.length * 500);
  }, [challengeSequence, playAndActivateDot]);
  
  const checkUserSequence = useCallback(() => {
    const isMatch = userEnteredSequence.every((val, index) => val === challengeSequence[index]);
    if (!isMatch) {
      alert('Sequence incorrect. Try again!');
      // Reset for a new game or retry
      setChallengeSequence([]);
      setUserEnteredSequence([]);
      setChallengePlaying(false);
    } else if (userEnteredSequence.length && userEnteredSequence.length === challengeSequence.length) {
      alert('Correct! Next note added.');
      setUserEnteredSequence([]); // Clear user sequence for the next round
      addChallengeNoteAndPlay(); // Automatically add a new note and play the sequence
    }
  }, [userEnteredSequence, challengeSequence, addChallengeNoteAndPlay]);

  useEffect(() => {
    if (challengePlaying) {
      checkUserSequence();
    }
  }, [userEnteredSequence, challengePlaying, checkUserSequence]);



  const startGame = useCallback(() => {
    if (!challengePlaying && challengeSequence.length === 0) {
      addChallengeNoteAndPlay();
    }
  }, [addChallengeNoteAndPlay, challengePlaying, challengeSequence.length]);

  return (
    <div className="playingRectangle simon">
      {dotConfig.map((row, rowIndex) => (
        <div key={rowIndex} className="simonRow">
          {row.map((dot, dotIndex) => (
            <div
              key={`${rowIndex}-${dotIndex}`}
              className="dot dotSimon"
              style={{ filter: activeDots[`${rowIndex}-${dotIndex}`] ? 'brightness(50%)' : 'none', backgroundColor: dot.color }}
              onClick={() => handleDotActivate(rowIndex, dotIndex)}
            ></div>
          ))}
        </div>
      ))}
      {!challengePlaying && (
        <button className="testButton" onClick={startGame}>Start Game</button>
      )}
    </div>
  );
};

export default PatternSoloPlayingField;