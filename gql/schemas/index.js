/**
 * prueba graphql
 */

 const { gql } = require('apollo-server');


const typeDefs = gql`
    # type test
    type helloWord {
        message: String!
    }

    # User
    type User {
        id: ID!
        nickname: String!
        password: String!
        email: String!
        createAt: String
    }

    #Login
    type LoginResponse {
        status: Boolean!
        message: String!
        token: Token
    }

    # Token
    type Token{
        token: String!
    }

    #input 
    input UserInput {
        nickname: String!
        password: String!
        email: String!
        createAt: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    # Query
    type Query {
        sayHelloWord : helloWord
        
        # Users
        getUsers: [User]
    }

    # Mutation
    type Mutation {
        addUser(input: UserInput): User
        login(input: LoginInput): LoginResponse
    } 
`;


module.exports = typeDefs;