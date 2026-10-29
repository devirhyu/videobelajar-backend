const db = require('../config/db');

const getAllCourses = async (query) => {
  let sql = 'SELECT * FROM courses WHERE 1=1';
  const queryParams = [];

  if (query.search) {
    sql += ' AND (title LIKE ? OR description LIKE ?)';
    queryParams.push(`%${query.search}%`, `%${query.search}%`);
  }

  if (query.category) {
    sql += ' AND category = ?';
    queryParams.push(query.category);
  }

  if (query.sort) {
    const [field, order] = query.sort.split(':');
    const validFields = ['id', 'title', 'price', 'category'];
    const validOrders = ['ASC', 'DESC', 'asc', 'desc'];

    if (validFields.includes(field) && validOrders.includes(order)) {
      sql += ` ORDER BY ${field} ${order.toUpperCase()}`;
    } else {
      sql += ' ORDER BY id DESC'; 
    }
  } else {
    sql += ' ORDER BY id DESC'; 
  }

  const [rows] = await db.query(sql, queryParams);
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