import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import SingleComment from "./SingleComment";
import AuthService from "../../Services/AuthService";

const { TextArea } = Input;

function Comments(props) {
  const [Comment, setComment] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setIsAuthenticated(data.isAuthenticated);
      setUserName(data.user.name);
    });
  });

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      comment: Comment,
      productID: props.postID,
      userName: userName,
    };

    axios.post("/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Filed to save comment");
      }
    });
  };

  return (
    <div>
      {/*comment list*/}
      {/*{console.log(props.CommentList)}*/}

      {props.CommentList &&
        props.CommentList.map((comment, index) => (
          <React.Fragment>
            <SingleComment
              comment={comment}
              productID={props.postID}
              refreshFunction={props.refreshFunction}
            />
          </React.Fragment>
        ))}

      {isAuthenticated === true ? (
        <form
          class="col d-flex justify-content-center mt-5"
          style={{ display: "flex" }}
          onSubmit={onSubmit}
        >
          <TextArea
            style={{ width: "100%", height: "100px", borderRadius: "5px" }}
            onChange={handleChange}
            value={Comment}
            placeholder="Write your review.."
          />
          <br />

          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ width: "20%", height: "52px" }}
            onClick={onSubmit}
          >
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
}

export default Comments;
