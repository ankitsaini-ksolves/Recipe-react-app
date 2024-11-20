import React from "react";
import RecipeList from "./RecipeList";
import RecipeForm from "./RecipeForm";
import Filter from "./Filter";

const HomePage = () => {
  return (
    <div>
      <div className="container">
        <Filter />
        <RecipeForm />
        <RecipeList />
      </div>
    </div>
  );
};

export default HomePage;
