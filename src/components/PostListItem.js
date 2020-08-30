import React from 'react'
import {Link} from 'react-router-dom'
import {List} from 'antd'
import { MessageOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import IconText from './IconText'
import Avatar from './Avatar'
import moment from 'moment'

const PostListItem = ({listData}) => {
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

export default PostListItem