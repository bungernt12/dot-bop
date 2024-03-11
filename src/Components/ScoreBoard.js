import React, { useState, useEffect } from "react";

const ScoreBoard = ({ gameRunning, setGameOver, setGameRunning, bopCount }) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    // No setup required if the game is not running
    if (!gameRunning) return;

    // Only set up the interval if timeLeft is greater than 0
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      // Clear the interval on cleanup
      return () => clearInterval(timerId);
    } else {
      // Handle the game over logic outside the interval and as a part of the effect
      // This ensures it's not directly during rendering
      setGameOver(true);
      setGameRunning(false);
    }
  }, [gameRunning, timeLeft, setGameOver, setGameRunning]); // Removed setGameOver and setGameRunning from the dependency array

  // Effect to reset the timer when the game starts
  useEffect(() => {
    if (gameRunning) {
      setTimeLeft(20); // Reset timer to initial value when game starts
    }
  }, [gameRunning]);

  return (
    <div>
      <h3>Bops: {bopCount}</h3>
      <h3>Time Left: {timeLeft} seconds</h3>
    </div>
  );
};

export default ScoreBoard;
