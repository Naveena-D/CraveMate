import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="overlay">
                <div className="home-content">
                    <h1 className="title">CraveMate</h1>
                    <p className="subtitle">Let your mood guide your food!</p>
                    <p className="tagline">
                        "Personalized comfort food recommendations based on your mood, body, and mind".
                    </p>
                    <button className="explore-btn" onClick={() => navigate("/form")}>
                        Explore Meals
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
