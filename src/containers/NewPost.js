import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Modal, Input, Button, Row, Col, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
  createPost as CreatePost,
  updatePost as UpdatePost,
} from "../graphql/mutations";
import { v4 as uuid } from "uuid";
import { API, Storage } from "aws-amplify";
import { useParams } from "react-router-dom";
import getImageUrl from "../s3/getImageUrl";

import { getPost as GetPost } from "../graphql/queries";
import getPostMdFile from "../s3/getPostMdFile";

import PostListItemEdit from "../components/PostListItemEdit";

function NewPost(props) {
  const initialValue = {
    id: "",
    title: "",
    content: "",
    description: "",
    imageURL: "",
  };
  const { postID } = useParams();
  const [postData, updatePostData] = useState(initialValue);

  function handleTextChange(name, value) {
    console.log("post: ", postData);
    //postData = {...postData, [name] : value}
    updatePostData({ ...postData, [name]: value });
  }

  useEffect(() => {
    console.log("NewPost useEffect:", postID);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user);
      })
      .catch(() => {
        props.history.push("/profile");
      });
    if (postID) {
      fetchPost();
    } else {
        updatePostData({...postData, id: uuid()})
    }
  }, []);

  async function fetchPost() {
    try {
      console.log("id:", postID);
      let postData = await API.graphql({
        query: GetPost,
        variables: { id: postID },
        authMode: "API_KEY",
      });

      console.log("Post content:", postData.data.getPost);
      const mdFileUrl = getPostMdFile(postID);
      console.log("signedUrl:", mdFileUrl);
      fetch(mdFileUrl)
        .then((response) => {
          if (response.ok) return response.text();
          else return Promise.reject("Didn't fetch text correctly");
        })
        .then((text) => {
          console.log("postDatapostDatapostDatapostData:", text);
          updatePostData({ ...postData.data.getPost, content: text });
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log("err:", err);
    }
  }

  async function createPost(isPuslish) {
    if (
      !postData.title ||
      !postData.content ||
      !postData.description ||
      !postData.imageURL
    ) {
      return alert("please enter a name, content, description and image URL");
    }

    const userData = await Auth.currentSession().catch((err) =>
      console.log("error: ", err)
    );

    postData.userID = userData.accessToken.payload.username;
    postData.username = userData.accessToken.payload.username;

    const newPost = {
      id: postData.id,
      type: "post",
      isPuslish: isPuslish,
      title: postData.title,
      description: postData.description,
      imageURL: postData.imageURL,
      username: postData.userID,
      userID: postData.username,
    };
    console.log(newPost);
    try {
      // submit data to DynamoDb
      await API.graphql({
        query: CreatePost,
        variables: { input: newPost },
      });

      // upload md file to S3
      await Storage.put("posts/" + postData.id + ".md", postData.content, {
        acl: "public-read",
      });
      console.log("upload s3 successfully!");

      // redirect to home
      props.history.push("/");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function updatePost(isPuslish) {
    if (
      !postData.title ||
      !postData.content ||
      !postData.description ||
      !postData.imageURL
    ) {
      return alert("please enter a name, content, description and image URL");
    }

    const userData = await Auth.currentSession().catch((err) =>
      console.log("error: ", err)
    );

    postData.userID = userData.accessToken.payload.username;
    postData.username = userData.accessToken.payload.username;

    const newPost = {
      id: postData.id,
      title: postData.title,
      description: postData.description,
      imageURL: postData.imageURL,
      isPuslish: isPuslish
    };

    try {
      // submit data to DynamoDb
      await API.graphql({
        query: UpdatePost,
        variables: { input: newPost },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log("call api successfully!");

      // upload md file to S3
      await Storage.put("posts/" + postID + ".md", postData.content, {
        acl: "public-read",
      });
      console.log("upload s3 successfully!");

      // redirect to home
      props.history.push("/" + postID);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  function cancelPost() {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to cancel this item?",
      icon: <ExclamationCircleOutlined />,
      content: "The content will not be saved",
      onOk() {
        props.history.push("/");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  async function imageUploadFunction(file, onSuccess, onError) {
    console.log("begin upload image: ", file);
    const extension = file.name.split(".")[1];
    const fileName = uuid();
    try {
      // upload image file to S3
      await Storage.put("images/" + fileName + "." + extension, file, {
        acl: "public-read",
      });
      console.log("upload s3 successfully!");
      onSuccess(getImageUrl(fileName, extension));
    } catch (e) {
      console.log("error: ", e);
      onError(e);
    }
  }

  return (
    <Row justify="center">
      <Col span={20}>
        <Row justify="center">
          <Col span={20}>
            <Input
              placeholder="Title"
              bordered={false}
              style={{ fontSize: "3em", marginBottom: 12 }}
              name="title"
              value={postData.title}
              onChange={(e) => handleTextChange("title", e.target.value)}
            />
            <PostListItemEdit
              postData={postData}
              handleTextChange={handleTextChange}
            />
            <SimpleMDE
              options={{
                uploadImage: true,
                imageAccept: ["image/png", "image/jpeg"],
                imageUploadFunction: imageUploadFunction,
              }}
              onChange={(e) => handleTextChange("content", e)}
              name="content"
              value={postData.content}
            />
            <Row justify="center">
              <Col span={4}>
                <Space>
                  <Button onClick={cancelPost}>Cancel</Button>
                  {
                  postID ? (
                    <>
                    {
                        !postData.isPuslish && (
                        <Button type="primary" onClick={updatePost(false)}>
                            Save draft
                        </Button>
                        )
                    }
                    <Button type="primary" onClick={updatePost(true)}>
                        Puslish
                    </Button>
                    </>
                  ) : (
                    <>
                    <Button type="primary" onClick={createPost(false)}>
                        Save draft
                    </Button>
                    <Button type="primary" onClick={createPost(true)}>
                        Puslish
                    </Button>
                    </>
                  )
                  }
                  
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default NewPost;
