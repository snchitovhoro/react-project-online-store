
import React, {useContext, useEffect, useState} from "react";
import {APIConfig} from "../../store/API-Config";
import store from "../../store/store";
import axios from "axios";
import {REVIEW_API} from "../../constants/constants";
import { Button } from "@material-ui/core";

const  ProductReview = ()=>{
    const APIs = useContext(APIConfig);
    const [reviews,setReviews] = useState([]);
    const state = store.getState();
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }
    const approveReviewHandler = (review) => {
        axios(REVIEW_API + '/' + review.id + "/approve", {headers})
            .then(response => {
                if(response.data === true){
                    review.approved = true;
                    loadNotapprovedData();
                }
            }).catch(error => {
                alert(error.message);
        })
    };

    const loadNotapprovedData = ()=>{
        axios(REVIEW_API + "/notapproved",{headers})
            .then(response=>{
                setReviews(response.data);

            }).catch(error => {
            alert(error.message);
        })
    }
    useEffect(()=>{
        loadNotapprovedData();
    },[]);
    return (
      <div>
          <h1>Product Review</h1>
          <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>STAR</th>
                  <th>COMMENT</th>
                  <th>APPROVED</th>
              </tr>
              </thead>
              <tbody>
              {reviews && reviews.map((review) => (
                  <tr key={review.id}>
                      <td>{review.id}</td>
                      <td>{review.numberOfStars}</td>
                      <td>{review.content}</td>
                      <td>
                          {!review.approved && (
                              <Button
                                  type="button"
                                //   className="small"
                                  onClick={() => approveReviewHandler(review)}
                                  color="secondary" size="small" variant="contained" 
                              >
                                  Approve
                              </Button>
                          ) }
                      </td>
                  </tr>
              ))}
              </tbody>
          </table>
      </div>
    );

}
export  default  ProductReview;