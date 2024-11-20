import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../Action";

const RecipeList = () => {
    const dispatch = useDispatch();
    const { filteredRecipes } = useSelector((state) => state.recipes);
  
    useEffect(() => {
      dispatch(fetchRecipes());
    }, [dispatch]);
  
    const handleDelete = (id) => {
        console.log(id)
      dispatch(deleteRecipe(id));
    };
  
    return (
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
                    <strong>Difficulty:</strong> {recipe.difficulty}
                  </p>
                  <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)} > Delete </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default RecipeList;
