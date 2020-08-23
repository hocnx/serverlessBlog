
function getPostMdFile(postID) {
    return "https://serverless-blog170439-test.s3-ap-northeast-1.amazonaws.com/public/posts/"+postID+'.md'
}

export default getPostMdFile