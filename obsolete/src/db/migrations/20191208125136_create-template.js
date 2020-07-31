const { createTemplateDef, createTemplateColumn } = require("../templates/setup");

exports.up = async knex => {
    await createTemplateDef('dev', knex);
    await createTemplateColumn('dev', knex);
};

exports.down = async knex => {
    await knex.schema.withSchema('dev').dropTable('template_columns');
    await knex.schema.withSchema('dev').dropTable('template_defs');
};
