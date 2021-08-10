import React, { useContext, useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
//import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';
import { APIConfig } from '../../store/API-Config';
import store from "../../store/store";

export default function Home() {
    const [products, setProducts] = useState([]);
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const state = store.getState();
    const  userInfo = state.userInfo;
    useEffect(() => {
        const fecthData = async () => {
            try {
                const { data } = await axios.get(productAPI);
                setProducts(data);
                console.log(products);
                console.log("Success data");
              } catch (err) {
                console.log(err);
              }
            };
        if(userInfo == null || (userInfo && userInfo.isSeller === false && userInfo.isAdmin === false))
            return fecthData();
          }, []);

   return (
    <div className="row center">
        {products.map((product) => (
            <Product key={product.id} product={product}></Product>))}
    </div>
   );
}