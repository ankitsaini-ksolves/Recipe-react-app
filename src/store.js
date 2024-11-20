import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { combineReducers } from "redux";
import recipeReducer from "./recipeReducer";
const rootReducer = combineReducers({
    recipes: recipeReducer,
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;