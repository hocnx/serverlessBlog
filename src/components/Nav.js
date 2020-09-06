import React, { useEffect, useState, useContext } from "react";
import { Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  PlusOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { Hub } from "aws-amplify";
import {UserContext} from '../context/UserContext'

const Nav = (current) => {
  const [user] = useContext(UserContext);

  useEffect(() => {
    console.log("user:", user)
    }
    , []);

  return (
    <Menu current={current} mode="horizontal">
      <Menu.Item>
        <Link to="/">
          <HomeOutlined />
          Home
        </Link>
      </Menu.Item>

      {user.username && (
        <Menu.Item>
          <Link to={"/blog/" + user.userID}>
            <AimOutlined /> My Blog
          </Link>
        </Menu.Item>
      )}

      <Menu.Item>
        <Link to="/new_post">
          <Button type="primary">
            <PlusOutlined /> New post
          </Button>
        </Link>
      </Menu.Item>

      {user && user.isAdmin === true && (
        <Menu.Item style={{ float: "right" }}>
          <Link to="/admin">
            <SettingOutlined />
            Setting
          </Link>
        </Menu.Item>
      )}
      <Menu.Item style={{ float: "right" }}>
        <Link to="/profile">
          <UserOutlined /> {user ? user.username : "Login"}
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
