import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import axios from 'axios';
import { APIConfig } from '../../store/API-Config';
import store from "../../store/store";


export default function ShoppingCart(props) {
    // const productId = props.match.params.id;
    console.log(props.location.pathname);
    const productId = props.location.pathname
    ? Number(props.location.pathname.split('/')[2])
    : 1;
    console.log(productId);
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    console.log(qty);
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const fecthData = async () => {
            try {
                const { data } = await axios.get(productAPI + '/' + productId);
                setProduct(data);
                console.log("success 1");
                // const productMatch = data.product.find((x) => x.product.id === productId);
                // console.log("success 2");
                // setProduct(productMatch);
                console.log(product.price);
                console.log("Success data");
              } catch (err) {
                console.log(err);
              }
            };
            fecthData();
          }, []);

    // const [cartItems, setCartItems] = useState([]);
    // const [buyerId, setBuyerId] = useState([]);
    // const state = store.getState();
    // const userId = state.userInfo.id;




    //   const cart = useSelector((state) => state.cart);
    //   console.log(cart);

    //   const { cartItems } = cart;
    // const state = store.getState();
    // const { cartItems  } = state.cart;
    //   const dispatch = useDispatch();
    //   useEffect(() => {
    //     if (productId) {
    //       dispatch(addToCart(productId, qty));
    //     }
    //   }, [dispatch, productId, qty]);

    //   const removeFromCartHandler = (id) => {
    //     dispatch(removeFromCart(id));
    //   };
    
      
      const removeFromCartHandler = (id) => {
        
      };

    // useEffect(() => {
    //     const fecthBuyerId = async () => {
    //         try {
    //             const { data } = await axios.get(`localhost:8080/api/users/mybuyerinfo`);
    //             const id = data.id;
    //             setBuyerId(id);
    //             console.log("buyer");
    //             console.log(data);
    //           } catch (err) {
    //             console.log(err);
    //           }
    //         };
    //         fecthBuyerId();
    //       }, []);

        // const fecthData = async () => {
        //     try {
        //         const { data } = await axios.get(`localhost:8080/api/buyers/${buyerId}/cartnotcompleted`);
        //         setCartItems(data);
        //         console.log("Success data");
        //       } catch (err) {
        //         console.log(err);
        //       }
        //     };
        //     fecthData();
        //   }, []);

        //   useEffect(() => {
        //     const fecthData = async () => {
        //         try {
        //             const { data } = await axios.get(`localhost:8080/api/buyers/{buyerId}/cartnotcompleted`);
        //             setProduct(data);
        //             console.log("Success data");
        //           } catch (err) {
        //             console.log(err);
        //           }
        //         };
        //         fecthData();
        //       }, []);

        
    
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };
    return (
        <div className="row top">
        <div className="col-2">
            <h1>Shopping Cart</h1>
            <div className="row">
                <div>
                    <img
                        className="small"
                        src={product.photo}
                        alt={product.productName}
                    ></img>
              </div>
                    <div className="min-30">
                        {product.productName}
                    </div>
            
                <div>
                     Pirce : ${product.price}
                </div>
                <div>qty:{qty}</div>
            <div>
                        {/* <button
                        type="button"
                        onClick={() => removeFromCartHandler(product)}
                        >
                        Delete
                        </button> */}

                        <Link to="/">Delete</Link>
                    </div>
                    </div>
            {/* {cartItems.length === 0 ? (
            <>
                Cart is empty. <Link to="/">Go Shopping</Link>
            </>
            ) : (
            <ul>
                {cartItems.map((item) => (
                <li key={item.product}>
                    <div className="row">
                    <div>
                        <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                        ></img>
                    </div>
                    <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                        ${qty}
                        <select
                        value={item.qty}
                        onChange={(e) =>
                            dispatch(
                            addToCart(item.product, Number(e.target.value))
                            )
                        }
                        >
                        {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                            {x + 1}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                        <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div> */}
        </div>
        <div className="col-1">
            <div className="card card-body">
            <ul>
                <li>
                <h2>
                    {/* Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} */}
                    Total: ${product.price * qty}
                </h2>
                </li>
                <li>
                <button
                    type="button"
                    onClick={checkoutHandler}
                    className="primary block"
                    // disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    );
}
