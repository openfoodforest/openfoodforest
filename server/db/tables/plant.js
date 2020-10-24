const { DataTypes } = require('sequelize');

const Plant = {
    name: {
        type: DataTypes.STRING
    },
    genusName: {
        type: DataTypes.STRING
    },
    speciesName: {
        type: DataTypes.STRING
    },
    maxHeight: {
        type: DataTypes.INTEGER
    },
    maxWidth: {
        type: DataTypes.INTEGER
    }
};


module.exports = Plant;