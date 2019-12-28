const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const db = require("../../src/db/");
const config = require("../../src/config/");

const ExistingTableType = new GraphQLObjectType({
    name: 'Existing',
    fields: () => ({
        // id: { type: GraphQLInt },
        name: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // existingTable: {
        //     type: ExistingTableType,
        //     args: { id: { type: GraphQLID } },
        //     resolve(parent, args) {
        //         return db.raw(config.showTablesQueryPG)
        //             .where({ id: args.id }).first()
        //             .then(data => { return data; });
        //     }
        // },
        existingTables: {
            type: GraphQLList(ExistingTableType),
            resolve(parent, args) {
                console.log('showTablesQueryPG');
                return db.raw(config.showTablesQueryPG).then(data => {
                    let tablenames = data.rows.map(row => ({name: row.tablename}));
                    console.log(tablenames);
                    return tablenames;
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
});