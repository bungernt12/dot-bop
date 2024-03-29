import React, { useState, useEffect } from "react";

const ScoreBoard = ({
  gameOver,
  gameRunning,
  setGameOver,
  setGameRunning,
  bopCount,
  gameLength,
}) => {
  const [timeLeft, setTimeLeft] = useState(gameLength);

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
      setTimeLeft(gameLength);
      setGameOver(true);
      setGameRunning(false);
    }
  }, [gameRunning, timeLeft, setGameOver, setGameRunning, gameLength]); // Removed setGameOver and setGameRunning from the dependency array

  // Effect to reset the timer when the game starts
  // useEffect(() => {
  //   if (gameRunning) {
  //     setTimeLeft(gameLength); // Reset timer to initial value when game starts
  //   }
  // }, [gameRunning, gameLength]);

  // useEffect(() => {
  //   console.log('test', bopCount, gameRunning, gameOver);
  // }, [gameRunning, bopCount, gameOver])

  return (
    <div className="scoreBoard">
      <h3>Bops: {bopCount}</h3>
      <h3>Timer: {timeLeft}</h3>
      {/* {gameRunning ? <h3>Timer: {timeLeft}</h3> : <h3> </h3>} */}
    </div>
  );
};

export default ScoreBoard;
