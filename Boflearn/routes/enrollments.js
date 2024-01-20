// routes/enrollments.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: true,
        instructor: true,
        course: true,
      },
    });
    res.render('enrollments', { enrollments });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { studentId, instructorId, courseId } = req.body;
    const newEnrollment = await prisma.enrollment.create({
      data: {
        student_id: studentId,
        instructor_id: instructorId,
        course_id: courseId,
      },
    });
    res.redirect('/enrollments');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
