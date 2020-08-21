import React, { useState } from "react";
// feature-1 branch
import data from "./data.json";
import Products from "./components/Products";
function App() {
  const [state, setState] = useState({
    products: data.products,
    size: "",
    sort: "",
  });
  return (
    <div className="grid-container">
      <header className="App-header">
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products data={state.products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
