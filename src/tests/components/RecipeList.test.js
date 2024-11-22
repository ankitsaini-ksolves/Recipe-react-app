import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { toast } from 'react-toastify';
import RecipeList from "../../components/RecipeList";
import { addRecipe, fetchRecipes, deleteRecipe, editRecipe, openModal, closeModal } from '../../Action';
import recipeReducer from '../../recipeReducer';


jest.mock('react-toastify', () => ({
    toast: {
      success: jest.fn(),
      info: jest.fn(),
    },
  }));


  const store = createStore(recipeReducer);
  const mockRecipes = [
    {
      id: 1,
      name: 'Spaghetti',
      cuisine: 'Italian',
      tags: ['pasta', 'dinner'],
    },
  ];
  
  describe('RecipeList Component', () => {
    beforeEach(() => {
      store.dispatch({
        type: 'FETCH_RECIPES_SUCCESS',
        payload: mockRecipes,
      });
    });
  
    test('renders RecipeList and displays recipes', async () => {
      render(
        <Provider store={store}>
          <RecipeList />
        </Provider>
      );
  
      expect(screen.getByText('Recipes')).toBeInTheDocument();
  
      expect(screen.getByText('Spaghetti')).toBeInTheDocument();
      expect(screen.getByText('Italian')).toBeInTheDocument();
    });
  
    test('opens modal when clicking "Add Recipe" button', () => {
      render(
        <Provider store={store}>
          <RecipeList />
        </Provider>
      );
  
      const addButton = screen.getByText('Add Recipe');
      fireEvent.click(addButton);
        expect(store.getState().showModal).toBe(true);
    });
  
    test('deletes recipe when clicking "Delete" button', async () => {
      render(
        <Provider store={store}>
          <RecipeList />
        </Provider>
      );
  
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
        expect(store.getState().recipes.length).toBe(0); 
      expect(toast.info).toHaveBeenCalledWith('Deleted Successfully', { autoClose: 2000 });
    });
  });