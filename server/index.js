const { ApolloServer, gql } = require('apollo-server');
const { sequelize, connect, tables } = require('./db');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # todo automate this
  type Plant {
    name: String
    maxHeight: Int
    maxWidth: Int
    color: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    plants: [Plant]
  }
`;

async function run() {
  await connect();

  // Resolvers define the technique for fetching the types defined in the
  // schema. This resolver retrieves books from the "books" array above.
  const resolvers = {
    Query: {
      plants: () => tables.Plant.findAll(),
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

run();