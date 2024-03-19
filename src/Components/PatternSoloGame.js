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
    if (!challengePlaying) {
      setUserEnteredSequence(prev => [...prev, dotConfig.flat(2).indexOf(dot)]);
      // for some reason the first dot click isn't added to the userEnteredSequence
      console.log(userEnteredSequence);
    }
  }, [challengePlaying, playAndActivateDot, userEnteredSequence]);

  useEffect(() => {
    console.log(userEnteredSequence);
  }, [userEnteredSequence])

  const addChallengeNoteAndPlay = useCallback(() => {
    const randomDotIndex = Math.floor(Math.random() * dotConfig.flat(2).length);
    const updatedSequence = [...challengeSequence, randomDotIndex];
    setChallengeSequence(updatedSequence);

    updatedSequence.forEach((index, iterationIndex) => {
      setTimeout(() => {
        const dot = dotConfig.flat(2)[index];
        playAndActivateDot(dot.pitch);
      }, iterationIndex * 500);
    });

    setTimeout(() => {
      setChallengePlaying(false);
      setUserEnteredSequence([]);
    }, updatedSequence.length * 500 + 500);
  }, [challengeSequence, playAndActivateDot]);

  const startGame = useCallback(() => {
    setChallengePlaying(true);
    setChallengeSequence([]);
    setUserEnteredSequence([]);
    addChallengeNoteAndPlay();
  }, [addChallengeNoteAndPlay]);

  // Check user sequence against the challenge sequence
  useEffect(() => {
    if (challengePlaying && userEnteredSequence.length) {
      const isMatch = userEnteredSequence.every((val, index) => val === challengeSequence[index]);
      if (!isMatch || userEnteredSequence.length === challengeSequence.length) {
        setChallengePlaying(false);
        if (!isMatch) alert('Sequence incorrect. Try again!');
        if (userEnteredSequence.length === challengeSequence.length) alert('Correct! Starting new challenge.');
        setUserEnteredSequence([]);
        setChallengeSequence([]); // Optionally clear or expand for the next challenge
      }
    }
  }, [userEnteredSequence, challengeSequence, challengePlaying]);

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