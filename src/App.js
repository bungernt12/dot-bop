import "./App.css";
import PlayingField from "./Components/PlayingField";
import ScoreBoard from "./Components/ScoreBoard";
import { useState } from "react";

function App() {
  const [bopCount, setBopCount] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard
          bopCount={bopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
        <PlayingField
          setBopCount={setBopCount}
          gameRunning={gameRunning}
          setGameRunning={setGameRunning}
        />
      </header>
    </div>
  );
}

export default App;
