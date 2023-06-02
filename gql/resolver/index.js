
const { testMessage } = require('./../../controllers');

//User controllers
const { addAsyncUser, getAsyncUsers, asyncLogin, getAsyncUser, updateAsyncUser } = require('./../../controllers/User');

//Tweet Controllers
const { testTweet, asyncCreateTweets } = require('./../../controllers/Tweet');


const resolvers = {
    Query: {
        // query test
        sayHelloWord : () => testMessage(),

        //User
        getUsers: () => getAsyncUsers(),
        getUser: (_, {id, nickname}) => getAsyncUser(id, nickname),

        //Tweet
        helloTweet: () => testTweet(),
    },
    Mutation: {
        //User
        addUser: (_, { input }) => addAsyncUser(input),
        updateUser: (_, {input}, ctx) => updateAsyncUser(input, ctx),
        login: (_, {input}) => asyncLogin(input),

        //Tweet
        createTweet: (_, input, ctx) => asyncCreateTweets(input, ctx),
    }
}

module.exports = resolvers;