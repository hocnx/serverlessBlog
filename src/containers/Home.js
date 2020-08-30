import React, { useState, useEffect } from "react";
import { listSortedPosts as ListSortedPosts } from "../graphql/customQueries";
import { API } from "aws-amplify";
import { Row, Col } from "antd";
import PostListItem from "../components/PostListItem";

function Home() {
  const [listData, setListData] = useState([]);

  async function fetchPosts() {
    const posts = await API.graphql({
      query: ListSortedPosts,
      variables: { type: "post", sortDirection: "DESC" },
      authMode: "API_KEY",
    });
    console.log(posts);
    setListData(posts.data.listSortedPosts.items);
  }

  useEffect(() => {
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
export default Home;
