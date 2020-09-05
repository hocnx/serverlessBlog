/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      type
      title
      imageURL
      description
      username
      userID
      isPublish
      createdAt
      updatedAt
      comments {
        items {
          id
          postID
          content
          username
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        imageURL
        description
        username
        userID
        isPublish
        createdAt
        updatedAt
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSortedPosts = /* GraphQL */ `
  query ListSortedPosts(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSortedPosts(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        imageURL
        description
        username
        userID
        isPublish
        createdAt
        updatedAt
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const postsByUser = /* GraphQL */ `
  query PostsByUser(
    $userID: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        imageURL
        description
        username
        userID
        isPublish
        createdAt
        updatedAt
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      content
      username
      userID
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        username
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
