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

const DestTableType = new GraphQLObjectType({
    name: 'DestTable',
    fields: () => ({
        id: { type: GraphQLInt },
        tableName: { type: GraphQLString },
        destColumns: {
            type: new GraphQLList(DestColumnType),
            resolve(parent, args) {
                return db('dest_columns').withSchema('dev')
                    .where({ table_id: parent.id });
            }
        }
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
                    return data.rows.map(row => ({ tableName: row.tablename, schemaName: row.schemaname }));
                })
            }
        },
        destTable: {
            type: DestTableType,
            args: { schema: { type: GraphQLString }, id: { type: GraphQLID } },
            resolve(parent, args) {
                return db('dest_tables').withSchema(args.schema)
                    .where({ id: args.id }).first()
                    .then(data => {
                        if (!data) return {};

                        return {
                            id: data.id,
                            tableName: data.table_name
                        }
                    });
            }
        },
        destTables: {
            type: GraphQLList(DestTableType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('dest_tables').withSchema(args.schema).then(data => {
                    let tables = data.map(row => ({ id: row.id, tableName: row.table_name }));
                    return tables;
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

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
});