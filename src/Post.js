import React,{useState, useEffect} from 'react'
import { useParams, Link} from 'react-router-dom'
import {API} from 'aws-amplify'
import {getPost as GetPost} from './graphql/queries'
import  ReactMarkdown from 'react-markdown'
import NewComment from './NewComment'
import ListComments from './ListComments'
import {Comment, Row, Col} from 'antd'
import Avatar from './Avatar'
import getPostMdFile from './getPostMdFile'
import checkUser from './checkUser'
import { EditOutlined} from '@ant-design/icons';


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
                query: GetPost,
                variables: {id: id},
                authMode: 'API_KEY'
            })
            console.log('postData', postData)

            console.log('Post content:', postData.data.getPost)
            const mdFileUrl = getPostMdFile(id)
            console.log('signedUrl:', mdFileUrl)
            fetch(mdFileUrl)
                .then((response) => {
                    if (response.ok) return response.text();
                    else return Promise.reject("Didn't fetch text correctly");
                })
                .then((text) => {
                    updatePost({...postData.data.getPost, 'content':text})
                })
                .catch((error) => console.error(error));

        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
    <Row justify="center">
    <Col span={20}>
        <h1>{post.title}   
        { user && user.userID === post.userID &&
            (<Link to={'/'+ id +'/edit'}>
                <EditOutlined style={{fontSize: '24px', color: '#08c'}}/>
            </Link>
            )
        }
        </h1> 
        <ReactMarkdown source={post.content} />
        { user ? (<Comment
            avatar={
                <Avatar userID={user.userID} />
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
    </Col>
    </Row>
    )
}
export default Post