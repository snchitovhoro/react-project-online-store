import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { APIConfig } from '../../store/API-Config';
import { Link } from 'react-router-dom';
import Review from '../../components/Review/Review';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';


export default function Products(props) {
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const productId = props.match.params.id;
    console.log(productId);
    const [product, setProduct] = useState([]);
    //   const product = data.products.find((x) => x.id === props.match.params.id);
    const [qty, setQty] = useState(1);
 


  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(productAPI + '/' + productId);
            setProduct(data);
            console.log("success 1");
            // const productMatch = data.product.find((x) => x.product.id === productId);
            // console.log("success 2");
            // setProduct(productMatch);
            console.log("success 3");
            console.log(product);
            console.log("Success data");
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (

        <div>
          <Link to="/">Back to home page</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.photo}
                alt={product.productName}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.productName}</h1>
                </li>
                <li>

                    <h2>{product.reviews}</h2>
  
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Seller{' '}
                    {/* <h2>
                      <Link to={`/seller/${product.seller.id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2> */}
                    {/* <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating> */}
                  </li>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.quantityInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.quantityInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <TextField
                            label="Qty"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              variant="outlined"
                              select
                            >
                              {[...Array(product.quantityInStock).keys()].map(
                                (x) => (
                                  <MenuItem key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </TextField>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Button
                          onClick={addToCartHandler}
                          // className="primary block"
                          color="primary"
                          variant="contained"
                          size="large"
                        >
                          Add to Cart
                        </Button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        
        <Review key={productId} productId = {productId}/>
        </div>
  );
}