
function getProfileImage(userID) {
    return 'https://serverless-blog170439-test.s3-ap-northeast-1.amazonaws.com/public/profile_pictures/'+userID + '?'+Date.now()
}

export default getProfileImage