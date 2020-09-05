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
  console.log("userID: ", userID);
  console.log("login userID: ", user.userID);
  async function fetchPosts() {
    await checkUser(updateUser);
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
  }, [user.userID]);

  return (
    <Row justify="center">
      <Col span={20}>
        <PostListItem
          listData={listData}
          isMyPage={userID === user.userID ? true : false}
        />
      </Col>
    </Row>
  );
}
export default Blog;
