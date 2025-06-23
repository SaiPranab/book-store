const db = require('../../config/dbConfig');

const findUserById = async (userId) => {
  const [rows] = await db.execute(`SELECT * FROM users where id = ?`, [userId])
  console.log('find by user id ', rows);
  return rows[0];
}

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email]);
  return rows[0];
};

const createUser = async (name, email, password, role) => {
  const id = crypto.randomUUID();
  await db.execute(
    `INSERT INTO users (id, name, email, password, role, active) VALUES (?, ?, ?, ?, ?, true)`,
    [id, name, email, password, role]
  );
  return { id, name, email };
};

const saveRefreshToken = async (refreshToken) => {
  const tokenId = crypto.randomUUID()
  await db.execute(`INSERT INTO refresh_tokens (id, token) VALUES (?, ?)`, [tokenId, refreshToken]);
};

const findRefreshToken = async (refreshToken) => {
  const [rows] = await db.execute(`SELECT * FROM refresh_tokens WHERE token = ?`, [refreshToken]);
  return rows[0];
};

const deleteRefreshToken = async (refreshToken) => {
  await db.execute(`DELETE FROM refresh_tokens WHERE token = ?`, [refreshToken]);
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken
};
