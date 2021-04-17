const Sequelize = require('sequelize');


const connection = new Sequelize('apiblog','root','', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;