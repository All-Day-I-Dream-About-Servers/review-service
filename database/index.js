const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews'
});

db.connect( (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database connected');
  }
});

module.exports = db;