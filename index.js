const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const resolvers = require('./gql/resolvers');
const typeDefs = require('./gql/schemas');

const dotenv = require('dotenv');

dotenv.config({ path: '.env' });


mongoose.connect('mongodb://localhost:27017/books-curso',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: true,
    useCreateIndex: true
},  (err, _) => {
    if (err) {
        console.log(err);
    } else {
        serverApollo();
    }
});


const serverApollo = () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    apolloServer.listen({ port: process.env.PORT || 4000}).then(( {url} ) => {
        console.log('############################');
        console.log(`##Servidor Graphql: ${url}##`);
        console.log('############################');
    });
}