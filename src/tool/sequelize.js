const Sequelize = require('sequelize');

module.exports = connect();

function connect() {
  return new Sequelize('test', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    define: {timestamps: false, freezeTableName: true},
    pool: {min: 2, max: 10, idle: 10000},
    logging: false,
    // logging: console.log
  });
}
