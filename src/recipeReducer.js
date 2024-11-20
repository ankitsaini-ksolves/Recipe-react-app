const initialState = {
    recipes: [],
    filteredRecipes: [],
    categories: [],
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_RECIPES_SUCCESS":
        return {
          ...state,
          recipes: action.payload,
          filteredRecipes: action.payload,
        };
        case "ADD_RECIPE":
            return {
              ...state,
              recipes: [...state.recipes, action.payload],
              filteredRecipes: [...state.recipes, action.payload],
            };          
      case "EDIT_RECIPE":
        return {
          ...state,
          recipes: state.recipes.map((recipe) =>
            recipe.id === action.payload.id ? action.payload : recipe
          ),
        };
        case "DELETE_RECIPE":
            return {
              ...state,
              recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
              filteredRecipes: state.filteredRecipes.filter(
                (recipe) => recipe.id !== action.payload
              ),
            };
          
      case "FILTER_BY_CATEGORY":
        return {
          ...state,
          filteredRecipes: state.recipes.filter((recipe) =>
            recipe.tags.includes(action.payload)
          ),
        };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  