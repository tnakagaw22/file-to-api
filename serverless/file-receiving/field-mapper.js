var Engine = require("json-rules-engine").Engine;
var readOne = require('../data-access/column-mapping-definition/read-one');

let engine = new Engine();

const client = 'Tae';
const template = 'Listing';
const params = {
    TableName: 'ColumnMappingDefinition',
    Key: {
        // id: event.pathParameters.id
        'Client-Template-Column': 'Tae-Listing-Mls'
    }
};

const source = {
    'ml-number': 'ABC-12345',
    'listingStatus': 'A'
};

const result = {
    'mlsNumber': '',
    'status': ''
};

let resultColumn = params.Key['Client-Template-Column'].toString().replace(`${client}-${template}-`, '');

engine
    .on('success', event => {
        console.log('success ' + event.params.message)
        result[resultColumn] = event.params.message;
        console.log('result ' + JSON.stringify(result));
    })
    .on('failure', event => {
        console.log('failure ' + JSON.stringify(event))
    })

readOne(params, (error, data) => {
    if (error) {
        console.log(error);
    } else {

        if (data.MappingType === 'Column') {
            result[resultColumn] = source[data.MappingValue];
            console.log('result ' + JSON.stringify(result));
        } else if (data.MappingType === 'Rule') {
            data.MappingValue.forEach(rule => {
                engine.addRule(rule);
                console.log(`added rule ${rule}`);
            });

            let facts = { 'listingStatus': source['listingStatus'] };

            engine.run(facts).catch(console.log);
        }
    }


});