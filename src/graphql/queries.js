/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!, $createdAt: String!) {
    getPost(id: $id, createdAt: $createdAt) {
      id
      type
      title
      content
      username
      userID
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
    $id: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      id: $id
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        type
        title
        content
        username
        userID
        createdAt
        updatedAt
        comments {
          items {
            id
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPostByID = /* GraphQL */ `
  query ListPosts(
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        type
        title
        content
        username
        userID
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
