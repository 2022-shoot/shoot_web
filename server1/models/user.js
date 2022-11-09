const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id : {
                type : Sequelize.STRING(10),
                allowNull : false,
                primaryKey : true,
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : false
            },
            name : {
                type : Sequelize.STRING(30),
                allowNull : false
            },
            nick : {
                type : Sequelize.STRING(10),
                allowNull : true
            },
            birth : {
                type : Sequelize.DATE,
                allowNull : false
            },
            email : {
                type : Sequelize.STRING(30),
                allowNull : false,
            },
            mobile : {
                type : Sequelize.STRING(15),
                allowNull : true,
            },
        }, {
            sequelize,
            timestamps : true,
            modelName : 'User',
            tableName : 'users',
            paranoid : true,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        })
    }
    static associate (db) {
        db.User.belongsTo(db.Type,{foreignKey : 'user_type', sourceKey : 'type'});
    }
}

