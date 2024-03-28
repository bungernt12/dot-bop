import PlayingField from "../Components/CoOpGame";
import ScoreBoard from "../Components/ScoreBoard";
import { useState } from "react";

document.body.style.overflow = "hidden";

function CoOp() {
  const [bopCount, setBopCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameLength = 20;
  const [displayGameLobby, setDisplayGameLobby] = useState(true);

  return (
    <div className="App">
      <div className="App-header">
        <ScoreBoard
          bopCount={bopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
          gameLength={gameLength}
          setDisplayGameLobby={setDisplayGameLobby}
        />
        <PlayingField
          bopCount={bopCount}
          setBopCount={setBopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameLength={gameLength}
          displayGameLobby={displayGameLobby}
          setDisplayGameLobby={setDisplayGameLobby}
        />
      </div>
    </div>
  );
}

export default CoOp;
