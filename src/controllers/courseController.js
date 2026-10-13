const courseService = require('../services/courseService');

const getCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ status: 'success', data: courses });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ status: 'fail', message: 'Course tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', data: course });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const addCourse = async (req, res) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json({ status: 'success', message: 'Course berhasil ditambahkan', data: newCourse });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const editCourse = async (req, res) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ status: 'success', message: 'Course berhasil diubah', data: updatedCourse });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const removeCourse = async (req, res) => {
  try {
    const deleted = await courseService.deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: 'fail', message: 'Course tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', message: 'Course berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  editCourse,
  removeCourse,
};