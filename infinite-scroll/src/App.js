import './App.css';
import Card from './Card';
import ParticularData from './Particulardata';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
          <Route path="/" exact  element={<Card />} />
          <Route path = "particular-data" element={<ParticularData/>} />       
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
