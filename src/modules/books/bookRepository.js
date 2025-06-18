const pool = require("../../config/dbConfig");

const save = async (title, author) => {
  const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
  const [result] = await pool.execute(sql, [title, author]);
  return result;  // contains insertId, affectedRows, etc.
};

const findAll = async () => {
  const sql = "SELECT * FROM books";
  const [rows] = await pool.execute(sql);
  return rows;
};

const findById = async (id) => {
  const sql = "SELECT * FROM books WHERE id = ?";
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];  // or undefined if not found
};

const deleteById = async (id) => {
  const sql = "DELETE FROM books WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);
  return result;
};

const updateById = async (id, updates) => {
  const updatesKeys = Object.keys(updates);
  const updatesSql = updatesKeys.map(key => `${key} = ?`).join(", ");
  const values = updatesKeys.map(key => updates[key]);
  values.push(id);

  const sql = `UPDATE books SET ${updatesSql} WHERE id = ?`;
  const [result] = await pool.execute(sql, values);
  return result;
};

module.exports = {
  save,
  findAll,
  findById,
  updateById,
  deleteById,
};
