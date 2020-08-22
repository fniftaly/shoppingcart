import React, { useState } from "react";
// feature-1 branch
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
function App() {
  const [state, setState] = useState({
    products: data.products,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    size: "",
    sort: "",
  });
  const saveOrder = (order) => {
    console.log("Oreder has been saved: " + order.name);
  };
  const removeFromCart = (product) => {
    const cartItems = state.cartItems.slice();
    setState({
      ...state,
      cartItems: cartItems.filter((elm) => elm._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((elm) => elm._id !== product._id))
    );
  };
  const addToCart = (product) => {
    const cartItems = state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setState({ ...state, cartItems });
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  };
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
            <Products data={state.products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={state.cartItems}
              removeFromCart={removeFromCart}
              saveOrder={saveOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
