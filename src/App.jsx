import "./App.css";
import "./styleApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import Preferiti from "./components/Preferiti";

function App() {
  return (
    <div id="all" className="text-white d-flex flex-column justify-content-between">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Preferiti" element={<Preferiti />} />
        </Routes>
        <Footer className="flex-grow-1" />
      </BrowserRouter>
    </div>
  );
}

export default App;
