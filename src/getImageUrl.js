import config from './aws-exports'

function getImageUrl(fileName, extension) {
    const s3Bucket = config.aws_user_files_s3_bucket
    const s3Region = config.aws_user_files_s3_bucket_region
    return 'https://' +  s3Bucket + '.s3-' + s3Region + '.amazonaws.com/public/images/' + fileName + '.' + extension
}

export default getImageUrl