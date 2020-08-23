import React,{useState, useEffect} from 'react'
import { useParams, Link} from 'react-router-dom'
import {API} from 'aws-amplify'
import {getPostByID as GetPostByID} from './graphql/queries'
import  ReactMarkdown from 'react-markdown'
import NewComment from './NewComment'
import ListComments from './ListComments'
import {Comment, Avatar} from 'antd'
import getPostMdFile from './getPostMdFile'
import checkUser from './checkUser'
import { Row, Col } from 'antd';


function Post () {
    const [post, updatePost] = useState({})
    const {id} = useParams()
    const [user, updateUser] = useState()

    useEffect(() => {
        checkUser(updateUser)
        fetchPost()
    },[])

    async function fetchPost() {
        
        try {
            console.log('id:', id)
            const postData = await API.graphql({
                query: GetPostByID,
                variables: {id: id},
                authMode: 'API_KEY'
            })
            if(postData.data.listPosts.length === 0){
                console.log('404 Not found!')
            }
            console.log('Post content:', postData.data.listPosts.items[0])
            const mdFileUrl = getPostMdFile(id)
            console.log('signedUrl:', mdFileUrl)
            fetch(mdFileUrl)
                .then((response) => {
                    if (response.ok) return response.text();
                    else return Promise.reject("Didn't fetch text correctly");
                })
                .then((text) => {
                    updatePost({...postData.data.listPosts.items[0], 'content':text})
                })
                .catch((error) => console.error(error));

        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
    <>
        <h1>{post.title}</h1>
        <ReactMarkdown source={post.content} />
        { user ? (<Comment
            avatar={
                <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
                />
            }
            content={
                <NewComment postID={id} reloadPage={() => fetchPost(id)} user={user}/>
            }
        />) :
        (<Row justify="center">
            <Col span={2}>
                <Link to='/profile'>Login to comment</Link>
            </Col>
        </Row>)
        }

        {post.comments && (<ListComments comments={post.comments.items}/>)}
    </>
    )
}
export default Post