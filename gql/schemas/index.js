/**
 * prueba graphql
 */

 const { gql } = require('apollo-server');


const typeDefs = gql`
    # type test
    type helloWord {
        message: String!
    }

     """
        ENUM
    """
    enum StatusUser {
        ACTIVO
        INACTIVO
    }


    """
        Interfaces
    """

    interface StatusResponse {
        code: Int!
        message: String!
        error: String
        status: Boolean!
    }

    """
        Types
    """

    # User
    type User {
        id: ID!
        nickname: String!
        password: String!
        email: String!
        status: StatusUser
        createAt: String
    }

    # Tweet 
    type Tweet {
        id: ID!
        user: User!
        tweet: String!
        createAt: String
    }

    # Likes

    #Login
    type LoginResponse implements StatusResponse{
        code: Int!
        message: String!
        status: Boolean!
        error: String
        token: Token
    }

    #AddUser Response 
    type AddUserResponse implements StatusResponse {
        code: Int!
        message: String!
        status: Boolean!
        error: String
        user: User
    }

    #GetUser Response
    type getUserResponse implements StatusResponse {
        code: Int!
        message: String!
        status: Boolean!
        error: String
        user:  User
    }

    #GetUsers Response
    type getUsersResponse implements StatusResponse {
        code: Int!
        message: String!
        status: Boolean!
        error: String
        users: [User]
    }

    #UpdateResponseUser
    type UpdateUserResponse implements StatusResponse{
        code: Int!
        message: String!
        status: Boolean!
        error: String
    }

    #Tweet Response
    type TweetResponse implements StatusResponse {
        code: Int!
        message: String!
        status: Boolean!
        error: String
    }

    # Token
    type Token{
        token: String!
    }

    """
        Inputs
    """

    #input 
    input UserInput {
        nickname: String!
        password: String!
        email: String!
        status: String
    }

    # input para update User
    input UpdateUserInput {
        nickname: String
        email: String
        currentPassword: String
        password: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    # input Tweet
    input CreateInput {
        tweet: String!
    }

    """
        Queries
    """

    # Query
    type Query {
        sayHelloWord : helloWord
        
        # Users
        getUsers: getUsersResponse
        getUser(id:ID, nickname: String): getUserResponse

        # User Update


        # Tweet 
        helloTweet: helloWord
    }

    """
        Mutation
    """

    # Mutation
    type Mutation {
        # User
        addUser(input: UserInput): AddUserResponse
        updateUser(input: UpdateUserInput ): UpdateUserResponse
        login(input: LoginInput): LoginResponse

        # Tweet
        createTweet(input:CreateInput ): TweetResponse
    } 
`;


module.exports = typeDefs;