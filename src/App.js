import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
