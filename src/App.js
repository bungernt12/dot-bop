import "./App.css";
import CoOpPage from "./Pages/CoOpPage";
import BattlePage from "./Pages/BattlePage";
import HomePage from "./Pages/HomePage";
import PatternSoloPage from "./Pages/PatternSoloPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/CoOp" element={<CoOpPage />} />
        <Route path="/Battle" element={<BattlePage />} />
        <Route path="/PatternSolo" element={<PatternSoloPage />} />
      </>
    )
  );

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
