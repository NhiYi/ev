// src/models/refreshTokenModel.js
const { run, get } = require("../db");

const saveToken = async ({ token, userId, expiresAt }) => {
  return await run(
    `INSERT INTO refresh_tokens (token, userId, expiresAt) VALUES (?, ?, ?)`,
    [token, userId, expiresAt]
  );
};

const getToken = async (token) => {
  return await get(
    `SELECT token, userId, expiresAt, createdAt FROM refresh_tokens WHERE token = ?`,
    [token]
  );
};

const deleteToken = async (token) => {
  return await run(`DELETE FROM refresh_tokens WHERE token = ?`, [token]);
};

const deleteAllForUser = async (userId) => {
  return await run(`DELETE FROM refresh_tokens WHERE userId = ?`, [userId]);
};

module.exports = {
  saveToken,
  getToken,
  deleteToken,
  deleteAllForUser,
};
