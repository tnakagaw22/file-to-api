const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
// const { createStore } = require("./utils");
const resolvers = require("./resolvers");

const MappingDefinitionAPI = require("./datasources/mappingDefinition");

// const store = createStore();

const server = new ApolloServer({
//   context: async ({ req }) => {
//     // simple auth check on every request
//     const auth = (req.headers && req.headers.authorization) || "";
//     const email = Buffer.from(auth, "base64").toString("ascii");
//     if (!isEmail.validate(email)) return { user: null };
//     // find a user by their email
//     const users = await store.users.findOrCreate({ where: { email } });
//     const user = (users && users[0]) || null;
//     return { user: { ...user.dataValues } };
//   },
  typeDefs,
  resolvers,
  dataSources: () => ({
    mappingDefinitionAPI: new MappingDefinitionAPI(),
    // mappingDefinitionAPI: new MappingDefinitionAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
.catch(e => console.log(e));
