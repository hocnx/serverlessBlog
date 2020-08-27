import React, {useState, useEffect} from 'react'

import { List } from 'antd';
import Avatar from './Avatar'
import { MessageOutlined } from '@ant-design/icons';
import IconText from './IconText'

import { postsByUser as PostsByUser } from './graphql/queries'
import { API } from 'aws-amplify'
 
import { Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment'
import checkUser from './checkUser'

function Home() {
    const {userID} = useParams()
    const [listData, setListData] = useState([])
    const [user, updateUser] = useState({})
    async function fetchPosts(){
        const posts = await API.graphql({
            query: PostsByUser,
            variables: {userID: userID,  sortDirection: 'DESC'},
            authMode:'API_KEY'
        })
        console.log(posts)
        setListData(posts.data.postsByUser.items)
    }

    useEffect(() => {
        checkUser(updateUser)
        console.log('user: ',user)
        fetchPosts()
    },[])

    const  renderItem = item => (
        <List.Item
            key={item.id}
            actions={[
            <IconText icon={MessageOutlined} text={item.comments.items ? item.comments.items.length : 0} key="list-vertical-message" />,
            ]}
            extra={
            <img
                width={272}
                alt="logo"
                src={item.imageURL}
            />
            }>
            <List.Item.Meta
            avatar={<Avatar userID={item.userID} />}
            title={<Link to={'/'+item.id}>{item.title}</Link>}
            description= {(<><Link to={'/blog/'+ item.userID}>{item.username}</Link>  <span>{'   ' +  moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</span></>)}
            />
            {item.description}
        </List.Item>
    )

    return (
        <Row justify="center">
            <Col span={20}>
                <List
                    itemLayout="vertical"
                    size="large"
                    
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                    position: 'top'
                    }}
                    dataSource={listData}
                    renderItem={renderItem}
                />
            </Col>
    </Row>
  )
}
export default Home
