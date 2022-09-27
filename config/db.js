var mysql = require('mysql'); 


var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'airline_reservation_sys',
});


connection.connect(function (error) {
if (!!error) {
console.log(error);
} else {
console.log('MYSQL Database is now connected!');
}
});

module.exports = connection;