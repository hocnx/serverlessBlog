import config from '../aws-exports'


function getProfileImage(userID) {
    return 'https://' +  config.aws_user_files_s3_bucket + '.s3-' + config.aws_user_files_s3_bucket_region + '.amazonaws.com/public/profile_pictures/'+userID
}
export default getProfileImage