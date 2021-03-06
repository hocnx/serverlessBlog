import React from "react";
import { Link } from "react-router-dom";
import { List } from "antd";
import {
  MessageOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Row, Col, Space } from "antd";
import IconText from "./IconText";
import Avatar from "./Avatar";
import moment from "moment";

const PostListItem = ({ listData, isMyPage }) => {
  const renderItem = (item) => (
    <List.Item
      key={item.id}
      actions={[
        <IconText
          icon={MessageOutlined}
          text={item.comments.items ? item.comments.items.length : 0}
          key="list-vertical-message"
        />,
      ]}
      extra={
        <img
          width={256}
          alt="logo"
          src={item.imageURL}
          style={{ width: "256px", maxHeight: "140px", objectFit: "cover" }}
        />
      }
    >
      <List.Item.Meta
        avatar={<Avatar userID={item.userID} />}
        title={
          <Space>
            <Link to={"/" + item.id}>
              <h1 style={{ fontSize: "2em" }}>{item.title}</h1>
            </Link>
            {isMyPage &&
              (item.isPublish ? <EyeOutlined style={{ fontSize: "24px" }}/> : <EyeInvisibleOutlined style={{ fontSize: "24px" }}/>)}
          </Space>
        }
        description={
          <>
            <Link to={"/blog/" + item.userID}>{item.username}</Link>{" "}
            <span>
              {"   " + moment(item.createdAt).format("YYYY-MM-DD HH:mm")}
            </span>
          </>
        }
      />
      {item.description}
    </List.Item>
  );

  return (
    <Row justify="center">
      <Col span={24}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            position: "top",
          }}
          dataSource={listData}
          renderItem={renderItem}
        />
      </Col>
    </Row>
  );
};

export default PostListItem;
