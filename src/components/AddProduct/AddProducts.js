import React, { useContext, useState } from "react";
import { APIConfig } from "../../store/API-Config";
import { Link } from "react-router-dom";
import axios from "axios";
import store from "../../store/store";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const AddProduct = () => {
  const APIs = useContext(APIConfig);
  const [productName, setProductName] = useState("");
  const [producer, setProducer] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [category, setCategory] = useState("");
  const state = store.getState();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + state.oAuthToken,
  };

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        APIs.sellerAPI + "/newproduct",
        {
          productName: productName,
          producer: producer,
          description: description,
          size: size,
          price: price,
          color: color,
          quantityInStock: quantityInStock,
          category: {
            id: category,
          },
        },
        { headers }
      )
      .then((response) => {
        alert("Added successfully");
        document.location.href = "/newproduct";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>New Product</h1>
        </div>
        <div>
          <TextField
          label="Product Name"
            type="text"
            id="productName"
            placeholder="Enter Product name"
            required
            onChange={(e) => setProductName(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>
        <div>
          <TextField
          label="Producer"
            type="text"
            id="producer"
            placeholder="Enter Producer"
            required
            onChange={(e) => setProducer(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>
        <div>
          <TextField
          label="Size"
            type="text"
            id="Size"
            placeholder="Enter Size"
            required
            onChange={(e) => setSize(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>
        <div>
          <TextField
          label="Color"
            type="text"
            id="color"
            placeholder="Enter color"
            required
            onChange={(e) => setColor(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>
        <div>
          <TextField
          label="Price"
            type="number"
            id="price"
            placeholder="Enter Price"
            required
            onChange={(e) => setPrice(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>
        <div>
          <TextField
            label="Quantity In Stock"
            type="number"
            id="quantityInStock"
            placeholder="Enter Quantity In Stock"
            required
            onChange={(e) => setQuantityInStock(e.target.value)}
            variant="outlined"
          ></TextField>
        </div>

        <div>
          <TextField 
            label="Category"
            name="Category"
            id="Category"
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            select
          >
            <MenuItem value="1">Fashion</MenuItem>
            <MenuItem value="2">Toys</MenuItem>
            <MenuItem value="3">Electronics</MenuItem>
            <MenuItem value="4">Food</MenuItem>
            <MenuItem value="5">Furniture</MenuItem>
          </TextField >
        </div>
        <Link to="/productlist/seller">
          <Button color="secondary" size="large" variant="contained">
            Cancel
          </Button>
        </Link>
        <Button color="primary" size="large" variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};
export default AddProduct;
