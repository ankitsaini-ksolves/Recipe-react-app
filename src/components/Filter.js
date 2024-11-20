import React from "react";
import { useDispatch } from "react-redux";
import { filterByCategory } from "../Action";

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(filterByCategory(e.target.value));
  };

  return (
    <div className="container mt-4">
      <h3>Filter by Category</h3>
      <input type="text" className="form-control" onChange={handleFilter} placeholder="Enter category" />
    </div>
  );
};

export default Filter;
