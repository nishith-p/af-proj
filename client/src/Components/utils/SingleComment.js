import React from "react";
import { Comment, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function SingleComment(props) {
  return (
    <div class="col d-flex justify-content-center mt-5">
      <div class="card w-75 mb-5">
        <div class="card-body">
          <h6 class="card-title">{props.comment.userName}</h6>
          <p class="card-text">{props.comment.comment}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
