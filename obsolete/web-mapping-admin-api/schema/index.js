const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
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
        schema: { type: GraphQLString },
        columns: {
            type: new GraphQLList(DestColumnType),
            resolve(parent, args) {
                return db('dest_columns').withSchema(parent.schema)
                    .where({ table_id: parent.id })
                    .then(data => {
                        return data.map(row => ({ id: row.id, tableId: row.table_id, name: row.column_name, dataType: row.data_type, required: row.required }));
                    })
            }
        }
    })
});

const DestColumnType = new GraphQLObjectType({
    name: 'DestColumn',
    fields: () => ({
        id: { type: GraphQLInt },
        tableId: { type: GraphQLInt },
        name: { type: GraphQLString },
        dataType: { type: GraphQLString },
        required: { type: GraphQLBoolean }
    })
});

const TemplateDefType = new GraphQLObjectType({
    name: 'TemplateDef',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        published: { type: GraphQLBoolean },
        valid: { type: GraphQLBoolean },
        columns: {
            type: new GraphQLList(TemplateColumnType),
            resolve(parent, args) {
                console.log(JSON.stringify(parent))
                return db('template_columns').withSchema(parent.schema)
                    .where({ template_id: parent.id })
                    .then(data => {
                        return data.map(row => ({ id: row.id, templateId: row.template_id, destColumnId: row.dest_column_id, mappingType: row.mapping_type, mappingValue: row.mapping_value }));
                    })
            }
        }
    })
});
const TemplateColumnType = new GraphQLObjectType({
    name: 'TemplateColumn',
    fields: () => ({
        id: { type: GraphQLInt },
        mappingType: { type: GraphQLString },
        mappingValue: { type: GraphQLString },
        templateDef: {
            type: TemplateDefType,
            resolve(parent, args) {
                console.log(JSON.stringify(parent))
                return db('template_defs').withSchema(parent.schema)
                    .where({ id: parent.template_id }).first()
                    .then(data => {
                        return data.map(row => ({ id: row.id, name: row.template_name, published: row.published, valid: row.valid }));
                    });
            }
        },
        destColumn: {
            type: DestColumnType,
            resolve(parent, args) {
                return db('dest_columns').withSchema(parent.schema)
                    .where({ id: parent.destColumnId }).first()
                    .then(data => {
                        return { id: data.id, tableId: data.table_id, name: data.column_name, dataType: data.data_type, required: data.required };
                    })
            }
        }
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
                    .then(data => data.map(d => ({ schema: d.table_schema, name: d.table_name })));
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
                    .where({ id: args.id }).first()
                    .then(data => {
                        return data.map(row => ({ id: row.id, tableId: row.table_id, name: row.column_name, dataType: row.data_type, required: row.required, schema: args.schema }));
                    })

            }
        },
        destColumns: {
            type: GraphQLList(DestColumnType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('dest_columns').withSchema(args.schema)
                    .where({ table_id: parent.id })
                    .then(data => {
                        return data.map(row => ({ id: row.id, tableId: row.table_id, name: row.column_name, dataType: row.data_type, required: row.required, schema: args.schema }));
                    })
            }
        },
        templateDef: {
            type: TemplateDefType,
            args: { schema: { type: GraphQLString }, id: { type: GraphQLID } },
            resolve(parent, args) {
                return db('template_defs').withSchema(args.schema)
                    .where({ id: args.id }).first()
                    .then(data => {
                        return data.map(row => ({ id: row.id, name: row.template_name, published: row.published, valid: row.valid, schema: args.schema }));
                    });
            }
        },
        templateDefs: {
            type: GraphQLList(TemplateDefType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('template_defs').withSchema(args.schema)
                    .then(data => {
                        return data.map(row => ({ id: row.id, name: row.template_name, published: row.published, valid: row.valid, schema: args.schema }));
                    });
            }
        },
        templateColumn: {
            type: TemplateColumnType,
            args: { schema: { type: GraphQLString }, id: { type: GraphQLID } },
            resolve(parent, args) {
                return db('template_columns').withSchema(args.schema)
                    .where({ id: args.id }).first()
                    .then(data => {
                        return data.map(row => ({ id: row.id, templateId: row.template_id, destColumnId: row.dest_column_id, mappingType: row.mapping_type, mappingValue: row.mapping_value, schema: args.schema }));
                    })
            }
        },
        templateColumns: {
            type: GraphQLList(TemplateColumnType),
            args: { schema: { type: GraphQLString } },
            resolve(parent, args) {
                return db('template_columns').withSchema(args.schema)
                    .then(data => {
                        return data.map(row => ({ id: row.id, templateId: row.template_id, destColumnId: row.dest_column_id, mappingType: row.mapping_type, mappingValue: row.mapping_value, schema: args.schema }));
                    })
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