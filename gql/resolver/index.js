
const { testMessage } = require('./../../controllers');

//User controllers
const { addAsyncUser, getAsyncUsers, asyncLogin, getAsyncUser, updateAsyncUser } = require('./../../controllers/User');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),

        //User
        getUsers: () => getAsyncUsers(),
        getUser: (_, {id, nickname}) => getAsyncUser(id, nickname),
    },
    Mutation: {
        //addUser
        addUser: (_, { input }) => addAsyncUser(input),
        updateUser: (_, {input}) => updateAsyncUser(input),
        login: (_, {input}) => asyncLogin(input)
    }
}

module.exports = resolvers;