import db from "../config/database.js";

async function validateToken(token: string) {
  return await db.query(`
    SELECT users.id 
    FROM users 
    JOIN sessions
        ON users.id = sessions."userId"
    WHERE sessions.token = $1;
  `, [token]);
}

export default {
  validateToken,
};
