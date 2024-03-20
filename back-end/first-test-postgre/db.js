import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool ({
    user: 'postgres',
    password: 'pAM260704',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

export default pool