module.exports = function(sequelize, DataTypes) {
    var historicalCharacter = sequelize.define('historicalCharacter', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 75]
            }
        },
        bio: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        avatar: {
            type: DataTypes.STRING(500),
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'HistoricalCharacter' 
    });

    return historicalCharacter;
}