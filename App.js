// MODULE IMPORTS
import React from "react";
import { Provider } from "react-redux";
// FILE IMPORTS
import Root from "./navigation/tab";
import store from "./store";

export default App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
