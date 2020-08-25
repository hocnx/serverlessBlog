
function getImageUrl(fileName, extension) {
    return 'https://serverless-blog170439-test.s3-ap-northeast-1.amazonaws.com/public/images/' + fileName + '.' + extension
}

export default getImageUrl