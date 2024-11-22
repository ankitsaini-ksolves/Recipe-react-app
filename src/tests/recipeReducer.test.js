import recipeReducer from "../recipeReducer";

describe("recipeReducer", () => {
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

    it("should return the initial state when no action is provided", () => {
        const action = {};
        const state = recipeReducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    test('should handle FETCH_RECIPES_SUCCESS', () => {
        const mockRecipes = [
          {
            id: 1,
            name: 'Spaghetti',
            cuisine: 'Italian',
            tags: ['pasta', 'dinner'],
          },
        ];
    
        const action = {
          type: 'FETCH_RECIPES_SUCCESS',
          payload: mockRecipes,
        };
    
        const newState = recipeReducer(initialState, action);
    
        expect(newState.recipes).toEqual(mockRecipes);
        expect(newState.filteredRecipes).toEqual(mockRecipes);
      });
    
      test('should handle other actions', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = recipeReducer(initialState, action);
    
        expect(newState).toEqual(initialState);
      });

    it("should handle ADD_RECIPE action", () => {
        const newRecipe = {
            id: 1,
            name: "Pasta",
            ingredients: "flour, water",
            instructions: "Mix ingredients",
            cuisine: "Italian",
            tags: "vegetarian, easy",
        };

        const action = {
            type: "ADD_RECIPE",
            payload: newRecipe,
        };

        const expectedState = {
            ...initialState,
            recipes: [newRecipe],
            filteredRecipes: [newRecipe],
        };

        const state = recipeReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });

    it("should handle DELETE_RECIPE action", () => {
        const existingState = {
            ...initialState,
            recipes: [
                { id: 1, name: "Pasta" },
                { id: 2, name: "Salad" },
            ],
            filteredRecipes: [
                { id: 1, name: "Pasta" },
                { id: 2, name: "Salad" },
            ],
        };

        const action = {
            type: "DELETE_RECIPE",
            payload: 1,
        };

        const expectedState = {
            ...initialState,
            recipes: [{ id: 2, name: "Salad" }],
            filteredRecipes: [{ id: 2, name: "Salad" }],
        };

        const state = recipeReducer(existingState, action);
        expect(state).toEqual(expectedState);
    });
});
