const { getMessage, saveBook } = require('./../../controllers');

const resolvers = {
    Query: {
        //Message Test
        getMessageTest: (_, {}) => getMessage(),
    },

    Mutation: {
        insertBook: (_, { input }) => saveBook(input),
    }
}

module.exports = resolvers;