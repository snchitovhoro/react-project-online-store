import React, {useContext, useEffect, useState} from "react";
import {APIConfig} from "../../store/API-Config";
import axios from "axios";
import store from "../../store/store";
import {Link} from "react-router-dom";

const EditProduct = (props) =>{
    const APIs = useContext(APIConfig);
    const [productName, setProductName] = useState('');
    const [producer, setProducer] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [category, setCategory] = useState('');
    const [product,setProduct] = useState(null);
    const state = store.getState();
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(APIs.sellerAPI + "/updateproduct", {
            id:props.match.params.id,
            productName: productName,
            producer: producer,
            description: description,
            size: size,
            price: price,
            color: color,
            quantityInStock: quantityInStock,
            category: {
                id: category
            }
        },{headers}).then(response => {
            alert("Edited successfully");
            document.location.href = '/productlist/seller';
        })
            .catch(error => {
                alert(error.message);
            })
    }
    const loadData = ()=>{
        axios(APIs.productAPI + "/" + props.match.params.id,{headers})
            .then(response =>{
                const p = response.data;
                setProduct(p);
                setProductName(p.productName);
                setProducer(p.producer);
                setDescription(p.description);
                setSize(p.size);
                setPrice(p.price);
                setColor(p.color);
                setQuantityInStock(p.quantityInStock);
                setCategory(p.category.id);
            }).catch(error => {
            alert(error.message);
        }).catch(error=>{
            alert(error.message);
        })

    }
    useEffect(()=>{
        loadData();
    },[]);

    return (
      <div>
          {product && (
          <form className="form" onSubmit={handleSubmit}>
              <div>
                  <h1>Edit Product</h1>
              </div>
              <div>
                  <label htmlFor="productName">Product Name</label>
                  <input
                      type="text"
                      id="productName"
                      placeholder="Enter Product name"
                      required
                      onChange={(e) => setProductName(e.target.value)}
                      defaultValue={product.productName}
                  ></input>
              </div>
              <div>
                  <label htmlFor="producer">Producer</label>
                  <input
                      type="text"
                      id="producer"
                      placeholder="Enter Producer"
                      required
                      onChange={(e) => setProducer(e.target.value)}
                      defaultValue={product.producer}
                  ></input>
              </div>
              <div>
                  <label htmlFor="Size">Size</label>
                  <input
                      type="text"
                      id="Size"
                      placeholder="Enter Size"
                      required
                      onChange={(e) => setSize(e.target.value)}
                      defaultValue={product.size}
                  ></input>
              </div>
              <div>
                  <label htmlFor="color">Color</label>
                  <input
                      type="text"
                      id="color"
                      placeholder="Enter color"
                      required
                      onChange={(e) => setColor(e.target.value)}
                      defaultValue={product.color}
                  ></input>
              </div>
              <div>
                  <label htmlFor="price">Price</label>
                  <input
                      type="number"
                      id="price"
                      placeholder="Enter Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      defaultValue={product.price}
                  ></input>
              </div>
              <div>
                  <label htmlFor="quantityInStock">Quantity In Stock</label>
                  <input
                      type="number"
                      id="quantityInStock"
                      placeholder="Enter Quantity In Stock"
                      required
                      onChange={(e) => setQuantityInStock(e.target.value)}
                      defaultValue={product.quantityInStock}
                  ></input>
              </div>

              <div>
                  <label htmlFor="Category">Category</label>

                  <select name="Category" id="Category" defaultValue={product.category.id} onChange={(e) => setCategory(e.target.value)}>
                      <option value=""> </option>
                      <option value="1">Fashion</option>
                      <option value="2">Toys</option>
                      <option value="3">Electronics</option>
                      <option value="4">Food</option>
                      <option value="5">Furniture</option>
                  </select>
              </div>
              <Link to="/productlist/seller">
                  <button className="primary" >
                      Cancel
                  </button>
              </Link>
              <button className="primary" type="submit">
                  Update
              </button>


          </form>
          )}
      </div>
    );
}
export  default  EditProduct;