import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../Action";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    tags: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      ingredients: recipe.ingredients.split(","),
      instructions: recipe.instructions.split(","),
      tags: recipe.tags.split(","),
    };
    dispatch(addRecipe(newRecipe));
    setRecipe({ name: "", ingredients: "", instructions: "", tags: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input type="text" name="name" value={recipe.name} onChange={handleChange} className="form-control" placeholder="Enter recipe name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} className="form-control" placeholder="Enter ingredients" />
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea name="instructions" value={recipe.instructions} onChange={handleChange} className="form-control" placeholder="Enter instructions" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input type="text" name="tags" value={recipe.tags} onChange={handleChange} className="form-control" placeholder="Enter tags" />
        </div>
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
