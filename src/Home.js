import React, {useState, useEffect} from 'react'

import { List } from 'antd';
import Avatar from './Avatar'

import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import IconText from './IconText'

import { listSortedPosts as ListSortedPosts } from './graphql/queries'
import { API } from 'aws-amplify'
 
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import getProfileImage from './getProfileImage'
import moment from 'moment'



const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

function Home() {
    const [listData, setListData] = useState([])

    async function fetchPosts(){
        const posts = await API.graphql({
            query: ListSortedPosts,
            variables: {type:'post', sortDirection: 'DESC'} , 
            authMode:'API_KEY'
        })
        console.log(posts)
        setListData(posts.data.listSortedPosts.items)
    }

    useEffect(() => {
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
        <Row justify="space-between">
            <Col span={17}>
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
        <Col span={6}>
            <Divider>Porpular posts</Divider>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar userID='hocnx' />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    /> 
                    </List.Item>
                )}
            />
        </Col>
    </Row>
  )
}
export default Home
