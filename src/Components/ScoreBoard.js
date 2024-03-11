import React, { useState, useEffect } from "react";

const ScoreBoard = ({ gameRunning, setGameOver, bopCount }) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    // Only set up the interval if timeLeft is greater than 0
    if ((timeLeft > 0) & gameRunning) {
      // Set up a timer that runs every 1000 milliseconds (1 second)
      const timerId = setInterval(() => {
        // Decrement the time left by 1 second
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      if (timeLeft === 0) {
        setGameOver(true);
      }

      // Clear the interval when the component unmounts or the timeLeft reaches 0
      // This is a cleanup function that React will run on component unmount
      return () => clearInterval(timerId);
    }
  }, [timeLeft, gameRunning, setGameOver]); // Dependency array, effect runs when timeLeft changes

  return (
    <div>
      <h3>Bops: {bopCount}</h3>
      {/* Display the time left */}
      <h3>Time Left: {timeLeft} seconds</h3>
    </div>
  );
};

export default ScoreBoard;
