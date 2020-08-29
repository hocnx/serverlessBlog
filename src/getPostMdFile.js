import config from './aws-exports'


function getPostMdFile(postID) {
    const s3Bucket = config.aws_user_files_s3_bucket
    const s3Region = config.aws_user_files_s3_bucket_region
    return 'https://' +  s3Bucket + '.s3-' + s3Region + '.amazonaws.com/public/posts/'+postID+'.md'
}

export default getPostMdFile