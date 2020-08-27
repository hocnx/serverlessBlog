import React, { useState, useEffect } from 'react'
import {AmplifyAuthenticator,  AmplifySignUp, AmplifySignOut, AmplifyConfirmSignUp} from '@aws-amplify/ui-react'
import { Auth} from 'aws-amplify'
import { Avatar, Row, Col } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { Hub } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import ProfilePictureUpload from './ProfilePictureUpload'
import getProfileImage from './getProfileImage'

function Profile() {

    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            console.log('authData:::', authData)
            setUser(authData)
            console.log('authData: ', authData)
        });
    }, []);

        return user && user.attributes ?
            (
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AmplifyAuthenticator>
            <AmplifySignUp
            slot="sign-up"
            formFields={[
                { type: "username" },
                { type: "email" },
                {
                type: "password"
                }
            ]} 
            />
            <AmplifyConfirmSignUp />
        </AmplifyAuthenticator>
        </div>
    )
}


export default Profile