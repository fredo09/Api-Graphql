const { gql } = require('apollo-server');

// Definimos la información para usar en los graphql
const typeDefs = gql`
    # Generando los types
    type MessageTest {
        saludo: String
    }

    type Book {
        name: String!
        createAt: String
        publication: String
        author: Author
        editorial: String!
    }

    # Author
    type Author {
        Id: ID
        name:  String!
        age: Int
        currentCity: String
        createAt: String
    }

    #input
    input inputBook {
        Id: ID
        name: String!
        editorial: String!
        publication: String
        author: String!
    }

    input inputAuthor {
        name:  String!
        age: Int
        currentCity: String
    }

    #Generando los queries
    type Query {
        # Message Prueba
        getMessageTest: MessageTest

        # Obtener todos libros
        getAllBooks: [Book]
    }

    # Generando los mutations
    type Mutation {
        insertBook( input: inputBook):  Book
        insertAuthor( input: inputAuthor ): Author
    }
`;

module.exports = typeDefs;