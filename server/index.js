/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const router = require('./router.js');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// all requests to a product id# go through router
app.use('/:id', router);

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.listen(port, () => console.log(`Server listening on port ${port}`));
