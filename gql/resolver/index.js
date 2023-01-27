
const { testMessage } = require('./../../controllers');

//User controllers
const { addAsyncUser, getAsyncUsers, asyncLogin } = require('./../../controllers/User');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),
        getUsers: () => getAsyncUsers(),
    },
    Mutation: {
        //addUser
        addUser: (_, { input }) => addAsyncUser(input),
        login: (_, {input}) => asyncLogin(input)
    }
}

module.exports = resolvers;