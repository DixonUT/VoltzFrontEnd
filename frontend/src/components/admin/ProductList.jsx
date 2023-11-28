import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductTableRow = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleUpdate = () => {
    onUpdate(updatedProduct);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <tr>
      <td>{product.id}</td>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              name="product"
              value={updatedProduct.product}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="size"
              value={updatedProduct.size}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="color"
              value={updatedProduct.color}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="number"
              name="inventory"
              value={updatedProduct.inventory}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              name="img"
              value={updatedProduct.img}
              onChange={handleInputChange}
            />
          </td>
        </>
      ) : (
        <>
          <td>{product.product}</td>
          <td>{product.description}</td>
          <td>{product.size}</td>
          <td>{product.color}</td>
          <td>{product.price}</td>
          <td>{product.inventory}</td>
          <td>{product.img}</td>
        </>
      )}
      <td className="actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Update</button>
            <button onClick={handleDelete} className="delete">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const productList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => toast("Error fetching products: ", { type: "error" }));
  }, []);

  const handleUpdate = (data) => {
    // Update product data in the API
    fetch(`http://localhost:8080/api/admin/product/${data.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === data.id ? data : product
          )
        )
      )
      .catch(() => toast("Error updating product: ", { type: "error" }));
  };

  const handleDelete = (productId) => {
    // Delete product from the API
    fetch(`http://localhost:8080/api/admin/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() =>
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        )
      )
      .catch(() => toast("Error deleting product: ", { type: "error" }));
  };

  return (
    <div>
      <h2>Products</h2>
      <table className="list">
        {/* Table header */}
        <thead>
          <tr>
            <th>ID</th>
            <th>product</th>
            <td>Description</td>
            <td>Size</td>
            <td>Color</td>
            <td>Price</td>
            <td>Inventory</td>
            <td>Image</td>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default productList;
