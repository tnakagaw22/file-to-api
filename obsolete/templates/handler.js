'use strict';

const { validateApiKey } = require('../src/services/users');
const { saveTemplateDef, saveTemplateColumn } = require('../src/services/templates')

const saveTemplate = async (event, context) => {

    let clientCode = event.headers['client-code'];
    let apiKey = event.headers['x-api-key'];
    let templateId = event.pathParameters ? event.pathParameters.templateId : null;
    let templateDef = JSON.parse(event.body);
  
    let validationResult = await validateApiKey(clientCode, apiKey);
    if (!validationResult.valid) {
      const { valid, ...noA } = validationResult;
      return noA;
    }
  
    let error = await saveTemplateDef(clientCode, templateId, templateDef);
  
    if (error) {
      return {
        statusCode: 500,
        body: 'failed to save template'
      };
    } else {
      return {
        statusCode: 200,
        body: `${clientCode}.template_defs has been saved successfully`
      };
    }
  
  };

  const saveTemplateColumnHandler = async (event, context) => {
  
    let clientCode = event.headers['client-code'];
    let apiKey = event.headers['x-api-key'];
    let templateId = event.pathParameters ? event.pathParameters.templateId : null;
    let templateColumnId = event.pathParameters ? event.pathParameters.templateColumnId : null;
    let templateColumn = JSON.parse(event.body);
  
    let validationResult = await validateApiKey(clientCode, apiKey);
    if (!validationResult.valid) {
      const { valid, ...noA } = validationResult;
      return noA;
    }

    if (!templateId) {
        return {
            statusCode: 400,
            body: `templateId is not known`
            }
    }
  
    let error = await saveTemplateColumn(clientCode, templateId, templateColumn, templateColumnId);
  
    if (error) {
      return {
        statusCode: 500,
        body: 'failed to save template column'
      };
    } else {
      return {
        statusCode: 200,
        body: `${clientCode}.template_columns has been saved successfully`
      };
    }
  
  };

module.exports = {
    saveTemplate,
    saveTemplateColumnHandler
};