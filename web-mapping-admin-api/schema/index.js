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
const clientDb = require("../../src/db/client-tables/");
const config = require("../../src/config/");
const { importClientTableColumns } = require('../../src/db/client-table-import/');

const ClientDatabaseTableType = new GraphQLObjectType({
    name: 'ClientDatabaseTable',
    fields: () => ({
        // id: { type: GraphQLInt },
        schema: { type: GraphQLString },
        name: { type: GraphQLString },
    })
});

const DestTableType = new GraphQLObjectType({
    name: 'DestTable',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        schema: { type: GraphQLString }
        // dest_columns: {
        //     type: new GraphQLList(DestColumnType),
        //     resolve(parent, args) {
        //         return db('dest_columns').withSchema('dev')
        //             .where({ table_id: parent.id });
        //     }
        // }
    })
});

const DestColumnType = new GraphQLObjectType({
    name: 'DestColumn',
    fields: () => ({
        id: { type: GraphQLInt },
        table_id: { type: GraphQLInt },
        column_name: { type: GraphQLString },
    })
});

const SaveToDestTableResponse = new GraphQLObjectType({
    name: 'SaveToDestTableResponse',
    fields: () => ({
        source: { type: ClientDatabaseTableType },
        dest: { type: DestTableType }
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
        clientDatabaseTables: {
            type: GraphQLList(ClientDatabaseTableType),
            resolve(parent, args) {
                return clientDb.getTables()
                .then(data => data.map(d => ({schema: d.table_schema, name: d.table_name})));
            }
        },
        destTable: {
            type: DestTableType,
            args: { schema: { type: GraphQLString }, id: { type: GraphQLID } },
            resolve(parent, args) {
                return db('dest_tables').withSchema(args.schema)
                    .where({ id: args.id }).first();
                // .then(data => {
                //     if (!data) return {};

                //     return {
                //         id: data.id,
                //         tableName: data.table_name
                //     }
                // });
            }
        },
        destTables: {
            type: GraphQLList(DestTableType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('dest_tables').withSchema(args.schema)
                .then(data => {
                    return data.map(row => ({ id: row.id, name: row.table_name, schema: args.schema }));
                })
            }
        },
        destColumn: {
            type: DestColumnType,
            args: { schema: { type: GraphQLString }, id: { type: GraphQLID } },
            resolve(parent, args) {
                return db('dest_columns').withSchema(args.schema)
                    .where({ id: args.id }).first();
            }
        },
        destColumns: {
            type: GraphQLList(DestColumnType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('dest_columns').withSchema(args.schema);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        saveToDestTable: {
            type: SaveToDestTableResponse,
            args: {
                schema: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return importClientTableColumns(args.schema, args.name);
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});