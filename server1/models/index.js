const Sequelize = require('sequelize');
const User = require('./user');
const Type = require('./type');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Type = Type;

User.init(sequelize);
Type.init(sequelize);

User.associate(db);
Type.associate(db);

module.exports = db;