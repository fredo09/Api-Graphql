const { getMessage } = require('./../../controllers');

const resolvers = {
    Query: {
        //Message Test
        getMessageTest: (_, {}) => getMessage(),
    }
}

module.exports = resolvers;