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
        schemaName: { type: GraphQLString },
        tableName: { type: GraphQLString },
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
                return db.raw(config.showTablesQueryPG).then(data => {
                    let tables = data.rows.map(row => ({ tableName: row.tablename, schemaName: row.schemaname }));
                    console.log(tables);
                    return tables;
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
});