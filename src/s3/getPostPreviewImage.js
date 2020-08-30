import config from "../aws-exports";

function getPostPreviewImage(fileName) {
  return (
    "https://" +
    config.aws_user_files_s3_bucket +
    ".s3-" +
    config.aws_user_files_s3_bucket_region +
    ".amazonaws.com/public/post_preview_imgs/" +
    fileName
  );
}

export default getPostPreviewImage;
