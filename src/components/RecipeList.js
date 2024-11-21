import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, addRecipe, openModal, closeModal, deleteRecipe, editRecipe } from "../Action";
import RecipeModal from "./RecipeModal";

const RecipeList = () => {
    const dispatch = useDispatch();
    const { filteredRecipes, showModal, currentRecipe } = useSelector((state) => state.recipes);
  
    useEffect(() => {
      dispatch(fetchRecipes());
    }, [dispatch]);
  
    const handleDelete = (id) => {
      dispatch(deleteRecipe(id));
      toast.info("Deleted Successfully",{autoClose: 2000});
    };

    const handleSubmit = () => {
        const recipeData = {
            ...currentRecipe,
            id: currentRecipe.id || Date.now(),
            ingredients: Array.isArray(currentRecipe.ingredients) ? currentRecipe.ingredients : currentRecipe.ingredients.split(",").map((i) => i.trim()),
            instructions: Array.isArray(currentRecipe.instructions) ? currentRecipe.instructions : currentRecipe.instructions.split(".").map((i) => i.trim()),
            tags: Array.isArray(currentRecipe.tags) ? currentRecipe.tags : currentRecipe.tags.split(",").map((i) => i.trim()),
        };
    
        if (currentRecipe.id) {
          dispatch(editRecipe(recipeData));
          toast.success("Recipe updated successfully!");
        } else {
          dispatch(addRecipe(recipeData));
          toast.success("Recipe added successfully!",{autoClose: 2000});
        }
    
        dispatch(closeModal());
      };
  
    return (
    <div>
    <button className="btn btn-success m-2" onClick={() => dispatch(openModal())}>Add Recipe</button>    
      <div className="container mt-4">
        <h2 className="text-center mb-4">Recipes</h2>
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <div className="card">
                <img src={recipe.image || "/food-word-text-typography-design-logo-icon-vector-21127840.jpg"} className="card-img-top" alt={recipe.name} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine:</strong> {recipe.cuisine} <br />
                    <strong>Tags:</strong> {recipe.tags.join(", ")}
                  </p>
                  <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)} > Delete </button>
                  <button className="btn btn-primary m-2" onClick={() => dispatch(openModal(recipe))}> Edit </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RecipeModal show={showModal} onClose={() => dispatch(closeModal())} onSubmit={handleSubmit} recipe={currentRecipe} setRecipe={(recipe) => dispatch(openModal(recipe))} isEditing={!!currentRecipe.id} />
    </div> 
    );
  };
  

export default RecipeList;
