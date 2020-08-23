import React from 'react'
import { Comment, Avatar, Tooltip, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import getProfileImage from './getProfileImage'

function ListComments({comments}) {
    return (
        <>
        <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={item =>  (
            <Comment
            author={item.username}
            avatar={
                    <Avatar
                    src={getProfileImage(item.userID)}
                    alt={item.username}
                    />
                }
            content={item.content}
            datetime={
                (
                    <Tooltip
                      title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    >
                      <span>
                        {moment(item.createdAt).fromNow()}
                      </span>
                    </Tooltip>
                  )
            }
        />
        )}
      />
      </>
    )
}

export default ListComments