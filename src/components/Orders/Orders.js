
import React, {useContext, useEffect, useState} from "react";
import {APIConfig} from "../../store/API-Config";
import store from "../../store/store";
import axios from "axios";
import { Button } from "@material-ui/core";

const  Orders = ()=>{
    const APIs = useContext(APIConfig);
    const [orders,setOrders] = useState([]);
    const state = store.getState();
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }
    const cancelOrderHandler = (order) => {
        axios(APIs.orderAPI + "/" + order.id+ "/cancel", {headers})
            .then(response => {
                if(response.data === true){
                    loadData();
                }
            }).catch(error => {
            alert(error.message);
        })
    };

    const pdfExportHandler = () => {
        axios(APIs.orderAPI + "/export/pdf", {responseType: 'arraybuffer',headers})
            .then(response => {
                if(response.data){
                    const fileURL = URL.createObjectURL( new Blob([response.data], { type: "application/pdf" }));

                    window.open(fileURL, "_blank");
                }
            }).catch(error => {
            alert(error.message);
        })
    };

    const loadData = ()=>{
            axios(APIs.orderAPI ,{headers})
                .then(response=>{
                    const info = JSON.stringify(response.data);
                    setOrders(response.data);
                }).catch(error => {
                alert(error.message);
            })
        }
    useEffect(()=>{
        loadData();
    },[]);
    return (
        <div>
            <h1>List Of Orders</h1>
            <Button
                type="button"
                // className="small"
                onClick={() => pdfExportHandler()}
                color="secondary" size="small" variant="contained"
            >
                Download PDF
            </Button>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                </tr>
                </thead>
                <tbody>
                {orders && orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.totalMoney}</td>
                        <td>{order.currentStatus}</td>
                        <td>
                            {order.currentStatus != "CANCELLED" &&
                                order.currentStatus != "SHIPPED" && order.currentStatus != "DELIVERED" && (
                            <Button
                                type="button"
                                // className="small"
                                onClick={() => cancelOrderHandler(order)}
                                color="secondary" size="small" variant="contained" 
                            >
                                Cancel
                            </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export  default  Orders;