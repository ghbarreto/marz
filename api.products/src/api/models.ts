const mariadb = require('mariadb');

export const DB = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: 'marz',
};

export const connect = async () => {
    let connection;
    try {
        connection = await mariadb.createPool({ ...DB }).getConnection();
        return await connection;
    } catch (err) {
        return console.log('there was an error connecting to the DB', err);
    } finally {
        if (connection) {
            connection.end();
        }
    }
};
