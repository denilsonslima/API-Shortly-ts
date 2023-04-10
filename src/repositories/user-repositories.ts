import { type } from "os";
import db from "../config/database.js";

async function signup({ name, email, senhaCriptografada }: Signup) {
  return await db.query(
    `
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  `,
    [name, email, senhaCriptografada]
  );
}

type Signup = {
  name: string,
  email: string,
  senhaCriptografada: string
}

async function findByEmail(email: string) {
  return await db.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
}

async function createSession({ token, id }: CreateSessions) {
  return await db.query(
    `
  INSERT INTO sessions (token, "userId") values ($1, $2);
  `,
    [token, id]
  );
}

type CreateSessions = {
  token: string;
  id: string;
};

export default {
  signup,
  findByEmail,
  createSession,
};
