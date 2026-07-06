// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BifrostWallet from "./pages/BifrostWallet";
import SupportPage from "./pages/SupportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BifrostWallet />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;