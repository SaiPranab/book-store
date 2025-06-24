const db = require('../../config/dbConfig');
const crypto = require('crypto');

const findUserById = async (userId) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
  return rows[0];
};

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

const createSession = async (sessionObj) => {  
  const {
    session_id,
    user_id,
    session_token,
    token_type,
    related_token_id = null,
    login_time = new Date(),
    expires_at,
    is_active = true
  } = sessionObj;

  const sql = `
    INSERT INTO sessions (
      session_id, user_id, session_token, token_type,
      related_token_id, 
      login_time, expires_at, is_active, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  await db.execute(sql, [
    session_id, user_id, session_token, token_type,
    related_token_id, 
    login_time, expires_at, is_active
  ]);
};

const findSessionById = async (sessionId) => {
  const [rows] = await db.execute(`SELECT * FROM sessions WHERE session_id = ?`, [sessionId]);
  return rows[0];
};

const invalidateSession = async (sessionId) => {
  await db.execute(`
    UPDATE sessions 
    SET is_active = false, logout_time = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
    WHERE session_id = ?
  `, [sessionId]);
};


module.exports = {
  findUserById,
  findUserByEmail,
  createUser,

  createSession,
  findSessionById,
  invalidateSession,
};
