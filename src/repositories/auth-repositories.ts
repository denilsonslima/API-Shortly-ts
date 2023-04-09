import db from "../config/database";

async function validateToken(token: string) {
  return await db.query(`
    SELECT users.id 
    FROM users 
    JOIN sessions
        ON users.id = sessions."userId"
    WHERE sessions.token = $1;
  `);
}


export default {
    validateToken
}