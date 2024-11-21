const initialState = {
    recipes: [],
    filteredRecipes: [],
    categories: [],
    showModal: false,
    currentRecipe: {
      id: null,
      name: "",
      ingredients: "",
      instructions: "",
      cuisine: "",
      tags: "",
    },
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
          filteredRecipes: [...state.filteredRecipes, action.payload],
        };
      case "EDIT_RECIPE":
        return {
          ...state,
          recipes: state.recipes.map((recipe) =>
            recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
          ),
          filteredRecipes: state.filteredRecipes.map((recipe) =>
            recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe
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
            recipe.tags.some((tag) =>
              tag.toLowerCase().includes(action.payload.toLowerCase())
            )
          ),
        };
      case "OPEN_MODAL":
        return {
          ...state,
          showModal: true,
          currentRecipe: action.payload || {
            id: null,
            name: "",
            ingredients: "",
            instructions: "",
            cuisine: "",
            tags: "",
          },
        };
      case "CLOSE_MODAL":
        return {
          ...state,
          showModal: false,
          currentRecipe: {
            id: null,
            name: "",
            ingredients: "",
            instructions: "",
            cuisine: "",
            tags: "",
          },
        };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  