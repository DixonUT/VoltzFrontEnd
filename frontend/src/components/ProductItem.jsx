import { Link, useNavigate } from "react-router-dom";
const serverhost = import.meta.env.VITE_SERVERHOST;
const ProductItem = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const title = `${product.product} - ${product.color} - ${product.size}`;

  return (
    <div className="product-item">
      <Link className="link" to={`/products/${product.id}`}>
        <img src={`${serverhost}/${product.img}`} alt={title} />
        <h1>{title}</h1>
      </Link>
      <p>${product.price}</p>
      <button
        className="CartButton"
        onClick={() => {
          addToCart(product);
          navigate("/cart");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
