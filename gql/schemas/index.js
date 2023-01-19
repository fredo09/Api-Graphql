const { gql } = require('apollo-server');

const typeDefs = gql`
    type MessageTest {
        saludo: String
    }

    type Book {
        name: String!
        createAt: String
        publication: String
        editorial: String!
    }

    #input
    input inputBook {
        name: String!
        editorial: String!
        publication: String
    }

    type Query {
        # Message Prueba
        getMessageTest: MessageTest
    }

    type Mutation {
        insertBook( input: inputBook):  Book
    }
`;

module.exports = typeDefs;