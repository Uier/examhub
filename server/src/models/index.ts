import mysql from 'mysql2';
import auth from './auth';
import user from './user';
import schema from './schema';

export const pool = mysql.createPool({
  connectionLimit: 10,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export default {
  init: () => {
    schema.forEach((s) => {
      pool.query(s, (error) => {
        if (error) throw error;
      });
    });
  },
  auth,
  user,
};