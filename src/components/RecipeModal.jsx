import React, { useEffect, useState } from "react";
import "../styles/recipeModal.css";

const RecipeModal = ({ mealName, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );
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

  // Extract ingredients from the recipe
  const getIngredients = () => {
    const ingredients = [];
    if (!recipe) return ingredients;

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }

    return ingredients;
  };

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

  const ingredients = getIngredients();

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
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.name}
            </li>
          ))}
        </ul>

        <h3>Instructions:</h3>
        <p>{recipe.strInstructions}</p>

        {recipe.strSource && (
          <a href={recipe.strSource} target="_blank" rel="noreferrer">
            📖 View Full Recipe
          </a>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
