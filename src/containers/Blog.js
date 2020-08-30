import React, { useState, useEffect } from "react";
import { postsByUser as PostsByUser } from "../graphql/queries";
import { API } from "aws-amplify";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import checkUser from "../checkUser";
import PostListItem from "../components/PostListItem";

function Blog() {
  const { userID } = useParams();
  const [listData, setListData] = useState([]);
  const [user, updateUser] = useState({});
  async function fetchPosts() {
    const posts = await API.graphql({
      query: PostsByUser,
      variables: { userID: userID, sortDirection: "DESC" },
      authMode: "API_KEY",
    });
    console.log(posts);
    setListData(posts.data.postsByUser.items);
  }

  useEffect(() => {
    checkUser(updateUser);
    console.log("user: ", user);
    fetchPosts();
  }, []);

  return (
    <Row justify="center">
      <Col span={20}>
        <PostListItem listData={listData} />
      </Col>
    </Row>
  );
}
export default Blog;
