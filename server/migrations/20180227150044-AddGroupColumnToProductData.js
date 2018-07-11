'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn( 'product_data', 'group', Sequelize.STRING(128) );
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn( 'product_data', 'group' );
    }
};