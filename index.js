const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const resolvers = require('./gql/resolver');
const typeDefs = require('./gql/schemas');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

//Obtenemos variables de entorno
dotenv.config({ path: '.env' }) ;


mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_MONGO}`,{
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
        resolvers,
        //TODO: autentificacion  
        context: ({req}) => {
            const token = req.headers.authorization;
  
            if (token) {

                try {
                    const user = jwt.verify(
                        token.replace('Bearer ', ''),
                        process.env.SEED_TOKEN
                    );

                    return {
                        user
                    };

                } catch(err) {
                    console.log(err);
                    console.log("** Token Invalido **")
                }
            }
        }
    });


    server.listen({port: process.env.PORT || 4000}).then(({url}) => {
        console.log('#############');
        console.log(`Servidor Graphql: ${url}`);
        console.log('#############')
    }); 
 }

