import "./App.css";
import CoOp from "./Pages/CoOp";
import HomePage from "./Pages/HomePage";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/CoOp" element={<CoOp />} />
    </>
  ))

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;
