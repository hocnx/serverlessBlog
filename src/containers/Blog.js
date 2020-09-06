import React, { useState, useEffect, useContext } from "react";
import { postsByUser as PostsByUser } from "../graphql/queries";
import { API } from "aws-amplify";
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import PostListItem from "../components/PostListItem";
import {UserContext} from '../context/UserContext'

function Blog() {
  const { userID } = useParams();
  const [listData, setListData] = useState([]);
  const [user, setUser] = useContext(UserContext);

  console.log("blog: ", userID);
  console.log("login userID: ", user.userID);
  async function fetchPosts() {
    let posts = [];
    if (userID === user.userID) {
      console.log("is owner");
      posts = await API.graphql({
        query: PostsByUser,
        variables: { userID: userID, sortDirection: "DESC" },
        authMode: "API_KEY",
      });
    } else {
      console.log("not owner");
      posts = await API.graphql({
        query: PostsByUser,
        variables: {
          userID: userID,
          sortDirection: "DESC",
          filter: {
            isPublish: {
              eq: true,
            },
          },
        },
        authMode: "API_KEY",
      });
    }

    console.log(posts);
    setListData(posts.data.postsByUser.items);
  }

  useEffect(() => {    
    fetchPosts();
  }, []);

  return (
    <Row justify="center">
      <Col span={24}>
        <PostListItem
          listData={listData}
          isMyPage={userID === user.userID ? true : false}
        />
      </Col>
    </Row>
  );
}
export default Blog;
