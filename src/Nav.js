import React, { useEffect, useState } from 'react'
import {Menu, Button} from 'antd'
import {Link} from 'react-router-dom'
import {HomeOutlined, UserOutlined, SettingOutlined, PlusOutlined, AimOutlined} from '@ant-design/icons'
import checkUser from './checkUser'
import { Hub } from 'aws-amplify'

const Nav = current => {
    const [user, updateUser] = useState() 

    useEffect(() => {
        checkUser(updateUser)
        console.log('user:', user)
        Hub.listen('auth', (data) => {
            const { payload: { event } } = data;
            console.log('event: ', event)
            if (event === 'signIn' || event === 'signOut')
            checkUser(updateUser)
          })
    },[])
    
    return (
        <Menu current={current} mode='horizontal'>
            <Menu.Item>
                <Link to='/'>
                    <HomeOutlined />Home
                </Link>
            </Menu.Item>

            { user && (
                <Menu.Item>
                    <Link to={'/blog/' + user.userID}>
                        <AimOutlined /> My Blog
                    </Link>
                </Menu.Item>
            )
            }

            <Menu.Item>
                <Link to='/new_post'>
                <Button type="primary">
                        <PlusOutlined /> New post
                </Button>
                </Link>
            </Menu.Item>

            {
               user && user.isAdmin === true && (
                <Menu.Item style={{float: 'right'}}>
                    <Link to='/admin'>
                        <SettingOutlined />Setting
                    </Link>
                </Menu.Item>
                )
            }
            <Menu.Item style={{float: 'right'}}>
                <Link to='/profile'>
                    <UserOutlined /> {user ? user.username : 'Login'}
                </Link>
            </Menu.Item>

        </Menu>
    )
}

export default Nav