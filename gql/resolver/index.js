
const { testMessage } = require('./../../controllers');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),
    }
}

module.exports = resolvers;