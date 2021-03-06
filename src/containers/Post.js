import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "aws-amplify";
import { getPost as GetPost } from "../graphql/queries";
import NewComment from "./NewComment";
import ListComments from "./ListComments";
import { Comment, Row, Col, Space, Divider } from "antd";
import Avatar from "../components/Avatar";
import getPostMdFile from "../s3/getPostMdFile";
import {UserContext} from '../context/UserContext'

import {
  EditOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import MarkdownPreview from "@uiw/react-markdown-preview";

function Post() {
  const [post, updatePost] = useState({});
  const { id } = useParams();
  const [user] = useContext(UserContext);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      console.log("id:", id);
      const postData = await API.graphql({
        query: GetPost,
        variables: { id: id },
        authMode: "API_KEY",
      });
      console.log("postData", postData);

      console.log("Post content:", postData.data.getPost);
      const mdFileUrl = getPostMdFile(id);
      console.log("signedUrl:", mdFileUrl);
      fetch(mdFileUrl)
        .then((response) => {
          if (response.ok) return response.text();
          else return Promise.reject("Didn't fetch text correctly");
        })
        .then((text) => {
          updatePost({ ...postData.data.getPost, content: text });
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log("err: ", err);
    }
  }

  return (
        <Row justify="center">
          <Col span={24}>
            <Space>
              <h1 style={{ fontSize: "3em" }}>{post.title}</h1>
              {user && user.userID === post.userID && (
                <>
                  {post.isPublish ? (
                    <EyeOutlined style={{ fontSize: "24px" }} />
                  ) : (
                    <EyeInvisibleOutlined style={{ fontSize: "24px" }} />
                  )}
                  <Link to={"/" + id + "/edit"}>
                    <EditOutlined style={{ fontSize: "24px", color: "#08c" }} />
                  </Link>
                </>
              )}
            </Space>
            <Divider orientation="left" plain>
              {" "}
              Content{" "}
            </Divider>
            <MarkdownPreview source={post.content} />
            {user ? (
              <Comment
                avatar={<Avatar userID={user.userID} />}
                content={
                  <NewComment
                    postID={id}
                    reloadPage={() => fetchPost(id)}
                    user={user}
                  />
                }
              />
            ) : (
              <Row justify="center">
                <Col span={4}>
                  <Link to="/profile">Login to comment</Link>
                </Col>
              </Row>
            )}

            {post.comments && <ListComments comments={post.comments.items} />}
          </Col>
        </Row>
  );
}
export default Post;
