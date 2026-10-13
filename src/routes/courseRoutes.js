const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  addCourse,
  editCourse,
  removeCourse,
} = require('../controllers/courseController');

// Mapping endpoint
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', addCourse);
router.put('/:id', editCourse);
router.delete('/:id', removeCourse);

module.exports = router;