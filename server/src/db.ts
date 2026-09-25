import pg from "pg";
import "dotenv/config"; // This loads the DATABASE_URL from your .env file

const { Pool } = pg;

// We export this 'pool' so other files can use it to talk to the database
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
