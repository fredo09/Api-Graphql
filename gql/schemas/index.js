/**
 * prueba graphql
 */

 const { gql } = require('apollo-server');


const typeDefs = gql`
    # type test
    type helloWord {
        message: String!
    }


    # Query
    type Query {
        sayHelloWord : helloWord
    }
`;


module.exports = typeDefs;