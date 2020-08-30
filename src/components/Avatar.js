import React from "react";
import { Avatar as AntAvatar } from "antd";
import getProfileImage from "../s3/getProfileImage";
import { Link } from "react-router-dom";

function Avatar({ userID }) {
  return (
    <Link to={"/blog/" + userID}>
      <AntAvatar src={getProfileImage(userID)} />
    </Link>
  );
}

export default Avatar;
