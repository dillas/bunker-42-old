import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User!
    me: User
  }
  
  extend type Mutation {
    singUp(
      username: String!
      email: String!
      password: String!
    ):Token!

    singIn(login: String!, password: String!): Token!

    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }
`
