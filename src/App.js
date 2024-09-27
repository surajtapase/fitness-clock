import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClockSlider from "./Pages/Clock";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ClockSlider />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
