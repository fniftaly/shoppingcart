import React, { useState, useEffect } from "react";
import formatCurrency from "./util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
const Products = ({ data, addToCart, products }) => {
  const [product, setProduct] = useState(null);

  const openModal = (product) => {
    setProduct(product);
  };
  const closeModal = () => {
    setProduct(null);
  };
  const handleModalClose = (product) => {
    addToCart(product);
    closeModal();
  };
  useEffect(() => {
    // fetchProducts();
    // products();
  }, []);
  return (
    <div>
      <Fade bottom cascade>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fade>
      {product && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Modal"
          appElement={document.getElementById("root")}
        >
          <Zoom>
            <div>Modal View</div>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes
                  {product.availableSizes.map((k) => (
                    <span key={k}>
                      {" "}
                      <button className="button">{k}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => handleModalClose(product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
