import PlayingField from "../Components/CoOpGame";
import ScoreBoard from "../Components/ScoreBoard";
import { useState } from "react";

document.body.style.overflow = "hidden";

function CoOp() {
  const [bopCount, setBopCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameLength = 20;

  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard
          bopCount={bopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
          gameLength={gameLength}
        />
        <PlayingField
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
