import React, {useEffect} from 'react'
import {AmplifySignUp} from '@aws-amplify/ui-react';
import {AmplifyAuthenticator, AmplifySignOut, AmplifyConfirmSignUp} from '@aws-amplify/ui-react'
import {Avatar, Row, Col} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';


import ProfilePictureUpload from '../components/ProfilePictureUpload'
import getProfileImage from '../s3/getProfileImage'


const Profile = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            console.log('authData:', authData)
            console.log('nextAuthState:', nextAuthState)

            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
    <>
    <Row justify="center">
        <Col span={8}>
            <h1>Profile</h1>
            <h2>Username: {user.username}</h2>
            <h3>Email: {user.attributes.email}</h3>
        </Col>
        <Col span={4}>
            <Row justify="center">
                <Col span={8}>
                    <Avatar size={128} src={getProfileImage(user.username)} icon={<UserOutlined />} />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={24}>
                    <ProfilePictureUpload username={user.username} reloadPage={()=>setUser({...user})}/>
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
                { type: "email" }
            ]}
            />
            <AmplifyConfirmSignUp slot="confirm-sign-up"/>
        </AmplifyAuthenticator>
    </Col>
    </Row>
      )
}

export default Profile;