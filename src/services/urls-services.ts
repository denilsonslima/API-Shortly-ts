import { nanoid } from "nanoid";
import urlRepositories from "../repositories/url-repositories.js";

async function create(url: string, id: number) {
  const shortUrl = nanoid(10);

  const {
    rows: [dados],
  } = await urlRepositories.create({ url, userId: id, shortUrl });

  return {
    id: dados.id,
    shortUrl: shortUrl,
  };
}

async function find(id: number) {
  const {
    rows: [dados],
    rowCount,
  } = await urlRepositories.find(id);

  if (rowCount < 1) throw new Error("Url not found!");

  return {
    id: dados.id,
    shortUrl: dados.shortUrl,
    url: dados.url
  };
}

async function redirect(shortUrl: string) {
  const {
    rows: [dados],
    rowCount,
  } = await urlRepositories.redirect(shortUrl);

  if (rowCount < 1) throw new Error("Url not found!");

  await urlRepositories.updateVisitCount(shortUrl)

  return dados;
}

async function deleteById(id: string, userId: string) {
  const {
    rows: [user], rowCount
  } = await urlRepositories.find(+id);

  if(rowCount < 1) throw new Error("Error")

  if(user.userId !== userId) throw new Error("Error")

  await urlRepositories.deleteById(+id);
  
  return
}

export default {
  create,
  find,
  redirect,
  deleteById
};
