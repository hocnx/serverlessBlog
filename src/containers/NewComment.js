import React,{useState} from 'react'
import {Form, Button, Input } from 'antd';
import {API} from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import {createComment as CreateComment} from '../graphql/mutations'

function NewComment({postID, reloadPage, user}){
    
    const [comment, updateComment] = useState('')
    
    const { TextArea } = Input;
    function onChange(e) {
        updateComment(e.target.value)
    }

    async function onSubmit(){
        console.log('postId: ', postID)
        if(comment === '') {
            return alert('please enter a comment')        
        }
        
        const newComment = {
            id: uuid(),
            postID: postID,
            content: comment,
            username: user.username, 
            userID: user.userID
        }
        try {
            console.log('newComment:', newComment)
            await API.graphql({
                query: CreateComment,
                variables: { input: newComment}
            })
            updateComment('')
            reloadPage()
            console.log('create comment successfully!')
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <>
        <Form.Item>
          <TextArea rows={4} onChange={onChange} value={comment} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={onSubmit} type="primary" disabled={comment === ''}>
            Add Comment
          </Button>
        </Form.Item>
      </>
    )
}

export default NewComment