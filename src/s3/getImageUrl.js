import config from "../aws-exports";

function getImageUrl(fileName, extension) {
  return (
    "https://" +
    config.aws_user_files_s3_bucket +
    ".s3-" +
    config.aws_user_files_s3_bucket_region +
    ".amazonaws.com/public/images/" +
    fileName +
    "." +
    extension
  );
}

export default getImageUrl;
