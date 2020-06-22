const express = require('express');
const cors = require('cors')
const logger = require('./middleware/logger');

const app = express();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

app.use(logger);

// API Routes
app.use('/api/mapping-definitions', require('./routes/mapping-definitions'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));