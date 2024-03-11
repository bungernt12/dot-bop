import logo from "./logo.svg";
import "./App.css";
import PlayingField from "./Components/PlayingField";
import ScoreBoard from "./Components/ScoreBoard";
import { useState } from "react";

function App() {
  const [bopCount, setBopCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <ScoreBoard bopCount={bopCount} />
        <PlayingField setBopCount={setBopCount} />
      </header>
    </div>
  );
}

export default App;
