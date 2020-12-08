import React from "react";
import ItemList from "./components/ItemList";
import Cart from "./components/Cart";
import "./sass/main.scss";

const App = () => {
  return (
    <>
      <ItemList />
      <Cart />
    </>
  );
};

export default App;
