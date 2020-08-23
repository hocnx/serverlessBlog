import React, {useState} from 'react'
import {Upload, Form, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import { Storage } from 'aws-amplify'


function ProfilePictureUpload({username, reloadPage}) {
    const normFile = e => {
        if (Array.isArray(e)) {
          return e;
        }
        if (e.fileList.length > 1){
            e.fileList.shift()
        }
        return e && e.fileList;
      };

    const uploadFile = (file) => {
        const image = file
        return image
    }

    async function  customRequest({ onSuccess, onError, file }) {
        try {
            const keyName = 'profile_pictures/' + username
            console.log('keyName:', keyName)
            await Storage.put(
                keyName, 
                file,
                {
                    acl: 'public-read'
                })

            onSuccess(null, file)
            console.log('upload pfofile success!')
            reloadPage()
        } catch (e) {
            onError(e)
        }
    }

    return (
        <Form>
            <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload data={uploadFile} 
                        accept=".jpg,.png,.jpeg" 
                        listType="picture" 
                        multiple={false} 
                        customRequest={customRequest}>
                <Button>
                    <UploadOutlined /> Click to upload
                </Button>
                </Upload>
            </Form.Item>
        </Form>
    )
}

export default ProfilePictureUpload