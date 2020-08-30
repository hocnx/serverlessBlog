import config from "../aws-exports";

function getPostMdFile(postID) {
  return (
    "https://" +
    config.aws_user_files_s3_bucket +
    ".s3-" +
    config.aws_user_files_s3_bucket_region +
    ".amazonaws.com/public/posts/" +
    postID +
    ".md"
  );
}

export default getPostMdFile;
