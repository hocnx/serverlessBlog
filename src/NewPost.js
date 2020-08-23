import React, {useEffect} from 'react'
import {Auth} from 'aws-amplify'
import { Modal, Input,Button } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons'

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {createPost as CreatePost} from './graphql/mutations'
import { v4 as uuid } from 'uuid'
import { API, Storage} from 'aws-amplify'

function NewPost(props) {
    const initialValue = {title:'', content:''}
    

    let postData =  initialValue
    function handleTextChange(name, value) {
        console.log('post: ', postData)
        postData = {...postData, [name] : value}
        //updatePost({...post, [name] : value})
    }

    useEffect(() => {
        console.log('NewPost useEffect')
        Auth.currentAuthenticatedUser()
          .then(user => {
            console.log(user);
          })
          .catch(() => {
            props.history.push('/profile')
          })
        }, [])

    async function createPost() {
        if (!postData.title || !postData.content) {
            return alert('please enter a name and description')
            }
        
        const userData = await Auth
            .currentSession()
            .catch(err => console.log('error: ', err))

        postData.userID = userData.accessToken.payload.username
        postData.username = userData.accessToken.payload.username


        // TODO: need implement the content truncate for Post listview
        const truncateContent = postData.content

        const id = uuid()
        const newPost = { ...postData, 
                        content:truncateContent,
                        id: id, type: 'post'}
        try {
            // submit data to DynamoDb
            await API.graphql({
                query: CreatePost,
                variables: { input: newPost}
                })

            // upload md file to S3
            await Storage.put('posts/'+id+'.md',
                            postData.content,
                            {
                                acl: 'public-read'
                            })
            console.log('upload s3 successfully!')

            // redirect to home
            props.history.push('/')
        } catch (err) {
            console.log("error: ", err)
        }
    }

    function cancelPost() {
        const { confirm } = Modal;
        confirm({
            title: 'Do you Want to cancel this item?',
            icon: <ExclamationCircleOutlined />,
            content: 'The content will not be saved',
            onOk() {
                props.history.push('/')
            },
            onCancel() {
              console.log('Cancel')
            },
          });
    }

    return (
        <>
            <Input placeholder="Title" bordered={false} style={{fontSize: '3em'}} name='title' onChange={e => handleTextChange('title', e.target.value)}/>
            <SimpleMDE onChange={e => handleTextChange('content', e)} name='content'/>
            <div>
            <Button onClick={cancelPost}>Cancel</Button>
            <Button type="primary" onClick={createPost}>Create</Button>
            </div>
        </>
    )
}
export default NewPost