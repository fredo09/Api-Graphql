const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const resolvers = require('./gql/resolver');
const typeDefs = require('./gql/schemas');
const dotenv = require('dotenv');

//Obtenemos variables de entorno
dotenv.config({ path: '.env' }) ;


mongoose.connect('mongodb://localhost:27017/tweets-graphql',{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log('Ocurrio un error al tratar de conectarse ', err);
    } else {
        serverApollo();
    };
});

const serverApollo = () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
        //TO DO: autentificacion  

    });


    server.listen({port: process.env.PORT || 4000}).then(({url}) => {
        console.log('#############');
        console.log(`Servidor Graphql: ${url}`);
        console.log('#############')
    }); 
 }

