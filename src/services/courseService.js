const db = require('../config/db');

const getAllCourses = async () => {
  const [rows] = await db.query('SELECT * FROM courses');
  return rows;
};

const getCourseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0];
};

const createCourse = async (data) => {
  const { title, description, price, category, mentor_name } = data;
  const [result] = await db.query(
    'INSERT INTO courses (title, description, price, category, mentor_name) VALUES (?, ?, ?, ?, ?)',
    [title, description, price, category, mentor_name]
  );
  return { id: result.insertId, ...data };
};

const updateCourse = async (id, data) => {
  const { title, description, price, category, mentor_name } = data;
  await db.query(
    'UPDATE courses SET title = ?, description = ?, price = ?, category = ?, mentor_name = ? WHERE id = ?',
    [title, description, price, category, mentor_name, id]
  );
  return { id, ...data };
};

const deleteCourse = async (id) => {
  const [result] = await db.query('DELETE FROM courses WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};