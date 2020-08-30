import React from "react";
import { Input } from "antd";
import { Row, Col } from "antd";

import PostPreviewImageUpload from "./PostPreviewImageUpload";
const PostListItemEdit = ({ postData, handleTextChange }) => {
  const { TextArea } = Input;

  return (
    <>
      <Row justify="space-between">
        <Col span={17}>
          <TextArea
            value={postData.description}
            style={{ marginBottom: 12 }}
            onChange={(e) => handleTextChange("description", e.target.value)}
            placeholder="Description"
            autoSize={{ minRows: 6, maxRows: 6 }}
            maxLength={300}
          />
        </Col>
        <Col span={6}>
          <PostPreviewImageUpload postID={postData.id} imageUrl={postData.imageURL} handleTextChange={handleTextChange}/>
        </Col>
      </Row>
    </>
  );
};

export default PostListItemEdit;
