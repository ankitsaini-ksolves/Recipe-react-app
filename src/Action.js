export const fetchRecipes = () => async (dispatch) => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: data.recipes });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  
  export const addRecipe = (recipe) => ({
    type: "ADD_RECIPE",
    payload: recipe,
  });
  
  export const editRecipe = (recipe) => ({
    type: "EDIT_RECIPE",
    payload: recipe,
  });
  
  export const deleteRecipe = (id) => ({
    type: "DELETE_RECIPE",
    payload: id,
  });
  
  export const filterByCategory = (category) => ({
    type: "FILTER_BY_CATEGORY",
    payload: category,
  });
  