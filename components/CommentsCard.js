import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import { ImCross } from "react-icons/im"
import axios from 'axios';
import { useAlert } from 'react-alert';
const user = (typeof window !== "undefined") && JSON.parse(localStorage.getItem("user"))


const CommentsCard = React.memo(({ comment, filmid }) => {
    const Alert=useAlert()
    const sendRemoveReq = async () => {
        try {
           await axios.delete(`https://pizzland.herokuapp.com/foods/deleteComment/${filmid}`,
           {commenter:`${comment.commenter}`}, { headers: { token: user.accessToken } })
            
            typeof window !== "undefined" && window.location.reload()
        } catch {
            Alert.error("something went wrong")
        }
    }
    return (
        <Card className=" col-md-6 my-2 rounded container col-lg-4   col-sm-12 shadow-sm ">
            <Card.Text className=" text-end">
                <span title="delete comment">
                    {comment.commenter === user._id||user.isAdmin && <ImCross className="deleteIcon " onClick={sendRemoveReq} />}
                </span>
            </Card.Text>


            <Card.Title className=" text-center"> {comment.comment}</Card.Title>

            <Card.Footer className=" text-muted">At:{comment.h.month}/{comment.h.day}/{comment.h.year}-{comment.h.hour}:{comment.h.min} by {comment.name}</Card.Footer>
        </Card>
    )
})

export default CommentsCard
