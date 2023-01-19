const { gql } = require('apollo-server');

const typeDefs = gql`
    type MessageTest {
        saludo: String
    }    

    type Query {
        # Message Prueba
        getMessageTest: MessageTest
    }
`;

module.exports = typeDefs;