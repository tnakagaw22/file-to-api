const express = require('express')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/');
const cors = require('cors');
// const config = require('./config');
// const db = require("./db");

const app = express();

app.use(cors());


// app.get("/books", async (req, res) => {
//     const todos = await db("books"); // making a query to get all todos
//     res.json({ todos });
//   });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port= 3001;
app.listen(port, () => {
    console.log(`now listing for requests on port ${port}`);
});