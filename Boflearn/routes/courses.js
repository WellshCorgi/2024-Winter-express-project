// routes/courses.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany();
    res.render('course', { courses });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description, duration, price } = req.body;
    const newCourse = await prisma.course.create({
      data: {
        course_name: name,
        course_description: description,
        course_duration: duration,
        course_price: price,
      },
    });
    res.redirect('/courses');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
