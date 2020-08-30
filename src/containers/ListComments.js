import React from "react";
import { Comment, Tooltip, List } from "antd";
import Avatar from "../components/Avatar";
import moment from "moment";

function ListComments({ comments }) {
  return (
    <>
      <List
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(item) => (
          <Comment
            author={item.username}
            avatar={<Avatar userID={item.userID} />}
            content={item.content}
            datetime={
              <Tooltip
                title={moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment(item.createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
        )}
      />
    </>
  );
}

export default ListComments;
