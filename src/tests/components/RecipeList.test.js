import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { toast } from 'react-toastify';
import RecipeList from "../../components/RecipeList";
import recipeReducer from '../../recipeReducer';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
  },
}));


const renderWithRedux = (component, { initialState, store } = {}) => {
  const rootReducer = combineReducers({ recipes: recipeReducer });
  const reduxStore = store || createStore(rootReducer, initialState, applyMiddleware(thunk));
  return {
    ...render(<Provider store={reduxStore}>{component}</Provider>),
    store: reduxStore,
  };
};

const initialState = {
  recipes: {
    recipes: [],
    filteredRecipes: [
      { id: 1, name: "Pasta", cuisine: "Italian", ingredients: "Water", instructions: "Mix Well", tags: ["Dinner", "Easy"], image: null },
    ],
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
  },
};

describe("RecipeList Component", () => {
  test("renders the RecipeList component correctly", () => {
    renderWithRedux(<RecipeList />, { initialState });

    expect(screen.getByText(/Add Recipe/i)).toBeInTheDocument();
    expect(screen.getByText(/Recipes/i)).toBeInTheDocument();
    expect(screen.getByText(/Pasta/i)).toBeInTheDocument();
  });

  test("opens modal on 'Add Recipe' button click", () => {
    const { store } = renderWithRedux(<RecipeList />, { initialState });

    const addButton = screen.getByText(/Add Recipe/i);
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.recipes.showModal).toBe(true);
    expect(state.recipes.currentRecipe).toEqual({
      id: null,
      name: "",
      ingredients: "",
      instructions: "",
      cuisine: "",
      tags: "",
    });
  });

  test("opens modal with recipe data when 'Edit' button is clicked", () => {
    const { store } = renderWithRedux(<RecipeList />, { initialState });

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const state = store.getState();
    expect(state.recipes.showModal).toBe(true);
    expect(state.recipes.currentRecipe).toEqual({
      id: 1,
      name: "Pasta",
      cuisine: "Italian",
      tags: ["Dinner", "Easy"],
      ingredients: "Water",
      instructions: "Mix Well",
      image: null,
    });
  });

  test("dispatches deleteRecipe when 'Delete' button is clicked", () => {
    const { store } = renderWithRedux(<RecipeList />, { initialState });

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    const state = store.getState();
    expect(state.recipes.filteredRecipes).toHaveLength(0);
    expect(toast.info).toHaveBeenCalledWith('Deleted Successfully', { autoClose: 2000 });

  });
});