const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://nikki:nikki@cluster0.4dxmfb1.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch(e => console.log(e));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
