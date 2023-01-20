const { getMessage, saveBook, allBooks, saveAuthor } = require('./../../controllers');

const resolvers = {
    Query: {
        //Message Test
        getMessageTest: (_, {}) => getMessage(),
        getAllBooks:(_, {}) => allBooks(),
    },

    Mutation: {
        insertBook: (_, { input }) => saveBook(input),
        insertAuthor: (_, { input } ) => saveAuthor(input),
    }
}

module.exports = resolvers;