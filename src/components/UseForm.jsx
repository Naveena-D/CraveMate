import React, { useState } from "react";
import "../styles/app.css";
import { useNavigate } from "react-router-dom";
const UserForm = ({ onSubmit }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    activity: "",
    mood: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/meals");
  };

  return (
    <div className="form-box fade-in">
      <h2>CraveMate - Get Your Comfort Food 🍽️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Height (in cm)"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Weight (in kg)"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          name="activity"
          value={formData.activity}
          onChange={handleChange}
          required
        >
          <option value="">Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light Exercise</option>
          <option value="moderate">Moderate Exercise</option>
          <option value="active">Active</option>
          <option value="very active">Very Active</option>
        </select>
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          required
        >
          <option value="">What's your mood?</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="stressed">Stressed</option>
          <option value="energetic">Energetic</option>
          <option value="tired">Tired</option>
        </select>
        <button type="submit">Get My Meal Plan 🍱</button>
      </form>
    </div>
  );
};

export default UserForm;
