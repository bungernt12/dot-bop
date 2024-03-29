import PatternSoloGame from "../Components/PatternSoloGame";
import { useState } from "react";

function CoOp() {
  const [bopCount, setBopCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  // const [gameOver, setGameOver] = useState(false);
  const gameLength = 20;

  return (
    <div className="App">
      <header className="App-header">
        {/* <ScoreBoard
          bopCount={bopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
          gameLength={gameLength}
        /> */}
        <PatternSoloGame
          bopCount={bopCount}
          setBopCount={setBopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameLength={gameLength}
        />
      </header>
    </div>
  );
}

export default CoOp;
