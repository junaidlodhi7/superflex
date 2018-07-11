require('dotenv').config();
const version = require('../../package.json').version;
module.exports = {
    "development": {
        "secret":  'seismic_development',
        "username": 'root',
        "password": 'root',
        "database": 'seismic_development',
        "host": 'localhost',
        "port": 5432,
        "dialect": "postgres",
        "version": version
    },
    "test": {
        "secret":  process.env.SECRET,
        "username": process.env.DATABSE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_HOST,
        "port": 5432,
        "dialect": "postgres",
        "version": version
    },
    "production": {
        "secret":   process.env.SECRET,
        "username": process.env.DATABSE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_HOST,
        "port": 5432,
        "dialect": "postgres",
        "version": version,
        "dialectOptions": {
            "bigNumberStrings": true
        }
    },
    "production_old": {
        "secret":   process.env.SECRET,
        "username": process.env.OLD_DATABSE_USERNAME,
        "password": process.env.OLD_DATABASE_PASSWORD,
        "database": process.env.OLD_DATABASE_NAME,
        "host": process.env.OLD_DATABASE_HOST,
        "port": 5432,
        "dialect": "postgres",
        "version": version,
        "dialectOptions": {
            "bigNumberStrings": true
        }
    }
};
