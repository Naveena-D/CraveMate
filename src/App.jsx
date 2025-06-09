import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserForm from "./components/UseForm";
import MoodMealSuggestor from "./components/MoodMealSuggestor";
import "./styles/app.css";

function App() {
    const [userData, setUserData] = useState(null); 
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<UserForm onSubmit={setUserData} />} />
        <Route path="/meals" element={<MoodMealSuggestor user={userData} />}/>
      </Routes>
    </Router>
  );
}

export default App;
