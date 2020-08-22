import React, { useState } from "react";
import formatCurrency from "./util";

const Cart = ({ cartItems, removeFromCart, saveOrder }) => {
  const [shorForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    address: "",
  });
  const handleInput = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: userInfo.name,
      email: userInfo.email,
      address: userInfo.address,
      cartItems: cartItems,
    };
    saveOrder(order);
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty!!</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} in the cart
        </div>
      )}
      <div className="cart">
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item._id}>
              <div>
                <img src={item.image} alt={item.title} />
              </div>
              <div>
                <div>{item.title}</div>
                <div className="right">
                  {formatCurrency(item.price)} x {item.count}{" "}
                  <button
                    className="button"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, b) => a + b.price * b.count, 0)
                )}
              </div>
              <button
                className="button primary"
                onClick={() => setShowForm(true)}
              >
                Proceed
              </button>
            </div>
          </div>
          <div>
            {shorForm && (
              <div className="cart">
                <form>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        autoComplete="off"
                        type="email"
                        value={userInfo.email}
                        name="email"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={userInfo.name}
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="address"
                        value={userInfo.address}
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <button
                        type="submit"
                        className="button primary"
                        onClick={createOrder}
                      >
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
