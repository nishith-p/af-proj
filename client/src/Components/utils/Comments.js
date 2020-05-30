import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import SingleComment from "./SingleComment";

const { TextArea } = Input;

function Comments(props) {
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      comment: Comment,
      productID: props.postID,
    };

    axios
      .post("http://localhost:5000/comment/saveComment", variables)
      .then((response) => {
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
      {console.log(props.CommentList)}

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

      {/*Root comment form*/}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="Write to us"
        />
        <br />

        <button
          type="button"
          class="btn btn-outline-primary"
          style={{ width: "20%", height: "52px" }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>

      <br />
      <br />
    </div>
  );
}

export default Comments;
