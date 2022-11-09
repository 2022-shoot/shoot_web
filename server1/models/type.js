const Sequelize = require('sequelize');

module.exports = class user_type extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            idx : {
                type : Sequelize.INTEGER(10),
                allowNull : false,
                primaryKey : true,
            },
            type : {
                type : Sequelize.STRING(10),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            modelName : 'Type',
            tableName : 'user_types',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        });
    }
    static associate (db) {
        db.Type.hasOne(db.User,{foreignKey : 'user_type',targetKey : 'type'});
    }
}