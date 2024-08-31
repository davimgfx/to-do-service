import knex from "knex";
import "dotenv/config"

export const db = knex({
    client: 'mysql2',
    connection: {
        user:  process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE_NAME
    }
});