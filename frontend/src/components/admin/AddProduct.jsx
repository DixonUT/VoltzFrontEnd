import { useState } from "react";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    product: "",
    description: "",
    size: "",
    color: "",
    price: 0,
    inventory: 0,
    img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/admin/product", {
        body: JSON.stringify(newProduct),
        method:"POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast("Product added successfully!", { type: "success" });

        // Reset the form fields after adding the product
        setNewProduct({
          product: "",
          description: "",
          size: "",
          color: "",
          price: 0,
          inventory: 0,
          img: "",
        });
      } else {
        toast("Error adding product: " + response.text, {
          type: "error",
        });
      }
    } catch (error) {
      toast("Error adding product: " + error.message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Add new Product</h2>
      <div>
        <label htmlFor="product">Name:</label>
        <input
          required
          type="text"
          name="product"
          value={newProduct.product}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          required
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
      </div>

      <div>
        <label htmlFor="size">Size:</label>
        <input
          type="text"
          name="size"
          value={newProduct.size}
          onChange={handleInputChange}
          placeholder="Size"
        />
      </div>

      <div>
        <label htmlFor="color">Color:</label>
        <input
          required
          type="text"
          name="color"
          value={newProduct.color}
          onChange={handleInputChange}
          placeholder="Color"
        />
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          required
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
      </div>

      <div>
        <label htmlFor="inventory">Inventory:</label>
        <input
          required
          type="number"
          name="inventory"
          value={newProduct.inventory}
          onChange={handleInputChange}
          placeholder="Inventory"
        />
      </div>

      <div>
        <label htmlFor="img">Image URL:</label>
        <input
          required
          type="text"
          name="img"
          value={newProduct.img}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
