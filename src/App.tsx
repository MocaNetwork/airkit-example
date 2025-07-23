import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReclaimDemo from "./pages/ReclaimDemo";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reclaim-demo" element={<ReclaimDemo />} />
      </Routes>
    </Router>
  );
};
