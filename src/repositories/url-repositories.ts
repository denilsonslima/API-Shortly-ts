import { QueryResult } from "pg";
import db from "../config/database.js";
import { CreateUrlParams } from "../protocols.js";

async function create({
  url,
  shortUrl,
  userId,
}: CreateUrlParams): Promise<QueryResult> {
  return await db.query(
    `
    INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id
    `,
    [url, shortUrl, userId]
  );
}

async function find(id: number): Promise<QueryResult> {
  return await db.query(
    `
    SELECT * FROM urls WHERE id = $1
      `,
    [id]
  );
}

async function redirect(shortUrl: string): Promise<QueryResult> {
  return await db.query(
    `
      SELECT * FROM urls WHERE "shortUrl" = $1
        `,
    [shortUrl]
  );
}

async function deleteById(id: number): Promise<QueryResult> {
  return await db.query(
    `
    DELETE FROM urls WHERE id = $1
  `,
    [id]
  );
}

async function updateVisitCount(shortUrl: string) {
  return await db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

export default {
  create,
  find,
  redirect,
  deleteById,
  updateVisitCount
};
