const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            shoot_id:{
                type : Sequelize.STRING(30),
                allowNull : false,
                unique: true,
            },
            password:{
                type : Sequelize.STRING(100),
                allowNull: false,
            },
            name :{
                type : Sequelize.STRING(10),
                allowNull : false,
            },
            birth :{
                type : Sequelize.DATE,
                allowNull: true,
            },
            email : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            phoneNumber:{
                type : Sequelize.STRING(15),
                allowNull : false,
                unique : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'User',
            tableName: 'users',
            paranoid : true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){}
};