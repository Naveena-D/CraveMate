import React, { useState, useEffect } from "react";
import "../styles/suggestor.css";

const RecipeModal = ({ mealName, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to fetch recipe.");
        console.error("Error fetching recipe:", err);
      }
    };
    fetchRecipe();
  }, [mealName]);

  if (error) {
    return (
      <div className="modal">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>❌ Close</button>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  // Generate ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>❌ Close</button>
        <h2>{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-img" />
        <h3>Category: {recipe.strCategory}</h3>
        <p><strong>Area:</strong> {recipe.strArea}</p>

        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ing, i) => (
            <li key={i}>• {ing}</li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <ul>
          {recipe.strInstructions.split(". ").map((step, i) => (
            <li key={i}>{step.trim()}.</li>
          ))}
        </ul>

        {recipe.strSource && (
          <a href={recipe.strSource} target="_blank" rel="noreferrer">📖 View Full Recipe</a>
        )}
      </div>
    </div>
  );
};

const MoodMealSuggestor = ({ user }) => {
  const [selectedMeal, setSelectedMeal] = useState(null);

  if (!user) return null;

  const calculateCalories = ({ gender, weight, height, age, activity }) => {
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very active": 1.9,
    };

    return Math.round(bmr * (activityFactors[activity] || 1.2));
  };

  const mealOptions = {
    happy: ["Mediterranean Pasta Salad", "Pancakes", "Salmon Avocado Salad", "Chicken Handi"],
    sad: ["Chicken sandwich", "Pudding Trifle", "Chicken & mushroom Hotpot"],
    stressed: ["Matar Paneer", "Tandoori chicken", "Lamb Biryani"],
    energetic: ["Peanut Butter Cheesecake", "Sugar Pie", "Shawarma", "Vegetarian Chilli"],
    tired: ["Bread omelette", "Beef Dumpling Stew", "Brown Stew Chicken"],
  };

  const moodColors = {
    happy: "#ffeaa7",
    sad: "#74b9ff",
    stressed: "#fab1a0",
    energetic: "#55efc4",
    tired: "#dfe6e9",
  };

  const bgColor = moodColors[user.mood] || "#f5f5f5";
  const meals = mealOptions[user.mood] || [];
  const calorieNeeds = calculateCalories(user);

  return (
    <div
      className="suggestor-box fade-in"
      style={{ backgroundColor: bgColor, transition: "background-color 0.5s ease" }}
    >
      <div className="suggestor-content">
        <h3>Hi {user.name}, based on your mood and profile:</h3>
        <p><strong>Estimated Daily Calorie Need:</strong> {calorieNeeds} kcal</p>
        <p><strong>Recommended Meals:</strong></p>
        <div className="meal-list">
          {meals.map((meal, index) => (
            <button
              key={index}
              className="meal-box"
              onClick={() => setSelectedMeal(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      {selectedMeal && (
        <RecipeModal mealName={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default MoodMealSuggestor;
