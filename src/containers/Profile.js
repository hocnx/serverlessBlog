import React, { useEffect, useContext } from "react";
import { AmplifySignUp } from "@aws-amplify/ui-react";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifyConfirmSignUp,
} from "@aws-amplify/ui-react";
import { Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import ProfilePictureUpload from "../components/ProfilePictureUpload";
import getProfileImage from "../s3/getProfileImage";
import {UserContext} from '../context/UserContext'

const Profile = () => {
  const [authState, setAuthState] = React.useState();
  const [user] = useContext(UserContext);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      console.log("authData:", authData);
      console.log("nextAuthState:", nextAuthState);
      setAuthState(nextAuthState);
    });
  }, []);

  return authState === AuthState.SignedIn && user.username ? (
    <>
      <Row justify="center">
        <Col span={8}>
          <h1>Profile</h1>
          <h2>Username: {user.username}</h2>
        </Col>
        <Col span={4}>
          <Row justify="center">
            <Col span={8}>
              <Avatar
                size={128}
                src={getProfileImage(user.username)}
                icon={<UserOutlined />}
              />
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <ProfilePictureUpload
                username={user.username}
                reloadPage={() => setAuthState({ ...authState })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={4}>
          <AmplifySignOut />
        </Col>
      </Row>
    </>
  ) : (
    <Row justify="center">
      <Col span={8}>
        <AmplifyAuthenticator>
          <AmplifySignUp
            slot="sign-up"
            formFields={[
              { type: "username" },
              { type: "password" },
              { type: "email" },
            ]}
          />
          <AmplifyConfirmSignUp slot="confirm-sign-up" />
        </AmplifyAuthenticator>
      </Col>
    </Row>
  );
};

export default Profile;
