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

    """
        Queries
    """

    # Query
    type Query {
        sayHelloWord : helloWord
        
        # Users
        getUsers: getUsersResponse
        getUser(id:ID, nickname: String): getUserResponse
    }

    """
        Mutation
    """

    # Mutation
    type Mutation {
        addUser(input: UserInput): AddUserResponse
        updateUser(input: UpdateUserInput ): UpdateUserResponse
        login(input: LoginInput): LoginResponse
    } 
`;


module.exports = typeDefs;