
const { testMessage } = require('./../../controllers');

//User controllers
const { addAsyncUser } = require('./../../controllers/User');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),
    },
    Mutation: {
        //addUser
        addUser: (_, { input }) => addAsyncUser(input),
    }
}

module.exports = resolvers;