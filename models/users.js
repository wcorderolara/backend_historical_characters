module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(75),
            allowNull: false,
            unique: true            
        },
        userLogin: {
            type: DataTypes.STRING,
			allowNull: false,
			unique: true
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		}
    }, {
        freezeTableName: true,
        tableName: 'user'
    })

    return User;
}