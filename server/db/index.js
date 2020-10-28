const { Sequelize } = require('sequelize');
const Plant = require('./tables/plant');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const tables = {};

connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // todo remove test code
        console.log(Plant);
        tables.Plant = sequelize.define('plant', Plant, {});
        await tables.Plant.sync();
        await tables.Plant.create({
            name: 'Sweet orange',
            genusName: 'citrus',
            speciesName: '× sinensis',
            maxHeight: 20,
            maxWidth: 30,
            color: '#768A3C',
        });
        await tables.Plant.create({
            name: 'Apple',
            genusName: 'malus',
            speciesName: 'domestica',
            maxHeight: 29,
            maxWidth: 29,
            color: '#304E18',
        });
        await tables.Plant.create({
            name: 'Lowbush blueberry',
            genusName: 'vaccinium',
            speciesName: 'angustifolium',
            maxHeight: 2,
            maxWidth: 5,
            color: '#43A903',
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
};

module.exports = {
    sequelize,
    Sequelize,
    connect,
    tables
}  