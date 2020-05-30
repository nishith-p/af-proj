import React from "react";
import { Comment, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function SingleComment(props) {
  return (
    <div>
      <Comment
        avatar={
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        }
        content={<p>{props.comment.comment}</p>}
      />
    </div>
  );
}

export default SingleComment;
