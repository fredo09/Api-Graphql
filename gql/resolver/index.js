
const { testMessage } = require('./../../controllers');

//User controllers
const { addAsyncUser, getAsyncUsers } = require('./../../controllers/User');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),
        getUsers: () => getAsyncUsers(),
    },
    Mutation: {
        //addUser
        addUser: (_, { input }) => addAsyncUser(input),
    }
}

module.exports = resolvers;