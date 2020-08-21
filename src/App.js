import React, { useState } from "react";
// feature-1 branch
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
function App() {
  const [state, setState] = useState({
    products: data.products,
    size: "",
    sort: "",
  });
  const sortProducts = (e) => {
    console.log(e.target.value);
    const sort = e.target.value;
    setState((state) => ({
      sort: sort,
      products: state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  const filterProducts = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setState({ size: e.target.value, product: data.products });
    } else {
      setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  return (
    <div className="grid-container">
      <header className="App-header">
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={state.products.length}
              size={state.size}
              sort={state.sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
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
