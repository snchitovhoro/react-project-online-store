import "./Review.css"
import React, { useContext, useEffect, useState, useRef } from "react";
import { APIConfig } from "../../store/API-Config";
import store from "../../store/store";
import axios from "axios";
import { Button, TextareaAutosize } from "@material-ui/core";

const Review = (props) => {
    const APIs = useContext(APIConfig);
    const [reviews, setReviews] = useState([]);
    const state = store.getState();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const contentRef = useRef(null);

    const loadReviewData = () => {
        axios(APIs.productAPI + "/" + props.productId + "/reviews")
            .then(response => {
                setReviews(response.data);

            }).catch(error => {
                alert(error.message);
            })
    }
    useEffect(() => {
        loadReviewData();       
    }, []);

    const onLeaveReviewHandler = () =>{
        setShowReviewForm(true);
    }

    const onSubmitHandler = () => {
        // console.log(state);

        let data = {
            "date": new Date(),
            "content": contentRef.current.value,
            "user" : {"id": state.userInfo.id},
            "product":{"id":props.productId} 
        }

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + state.oAuthToken,
        }

        axios.post(APIs.reviewAPI, data, {headers})
            .then(response => {
                alert('Review was sent. Wait to be approved');
            }).catch(error => {
            alert(error.message);
        })

        setShowReviewForm(false);
    }

    return (
        <div className="card">
            <div className="card-header">Product Reviews</div>
            <div className="card-body">
                {reviews && reviews.map((review) => (
                    <div>
                        <p>{review.content}</p>
                        <small className="text-muted">Posted by {review.user.firstName} {review.user.lastName} on {review.date}</small>
                        <hr />
                    </div>
                ))}
                {state.oAuthToken && true
                ? 
                    <div>
                        {!showReviewForm &&
                        <Button onClick={onLeaveReviewHandler} className="btn btn-success" size="large" variant="contained" href="">Leave a Review</Button>}

                        {showReviewForm &&
                        <form> 
                            <p> <TextareaAutosize ref = {contentRef} rows="5" cols="70" name="status" variant="outlined"></TextareaAutosize></p> 
                            <p><Button onClick={onSubmitHandler} color="primary" size="large" variant="contained">Submit</Button></p>
                        </form>}
                    </div>
                :
                    <h4> Sign In to leave a review! </h4>
                }
            </div>

        </div>
    );

}

export default Review;
