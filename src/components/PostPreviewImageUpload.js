import React, { useState, useEffect } from "react";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Storage } from "aws-amplify";
import getPostPreviewImage from "../s3/getPostPreviewImage";

function PostPreviewImageUpload({postID, imageUrl, handleTextChange}) {
  const [state, setState] = useState({ loading: false, postID: postID,  imageUrl: imageUrl });

  useEffect(() => {
    setState({ loading: false, postID: postID, imageUrl: imageUrl })
  },[imageUrl]);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    setState({ loading: true, imageUrl: imageUrl , postID: postID});
    return isJpgOrPng && isLt2M;
  }

  async function customRequest({ onSuccess, onError, file }) {
    try {
      const keyName = "post_preview_imgs/" + state.postID;
      console.log("keyName:", keyName);
      await Storage.put(keyName, file, {
        acl: "public-read",
        contentType: file.type,
      });

      onSuccess(null, file);
      console.log("upload success!");
      const url = getPostPreviewImage(state.postID) + "?" + Date.now()
      setState({
        loading: true,
        imageUrl: url,
        postID: postID
      });
      handleTextChange('imageURL', url)
    } catch (e) {
      console.log("upload err:", e);
      onError(e);
    }
  }

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        multiple={false}
        accept=".jpg,.png,.jpeg"
        customRequest={customRequest}
      >
        {state.imageUrl ? (
          <img
            src={state.imageUrl}
            alt="avatar"
            style={{ width: "256px", maxHeight: "140px", objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "256px", height: "120px" }}>
            {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
    </>
  );
}

export default PostPreviewImageUpload;
