const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const LaunchAPI = require("./datasources/launch");
const CharacterAPI = require("./datasources/characters");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },

  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    characterAPI: new CharacterAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
