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

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listening on port ${port}`));
