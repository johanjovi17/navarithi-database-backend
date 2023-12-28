const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "johan",
  host: "localhost",
  port: 5432,
  database: "navarithiWebsite",
});

module.exports = pool;
