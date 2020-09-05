/* eslint-disable */
// this is an auto generated file. This will be overwritten


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
        isPuslish
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