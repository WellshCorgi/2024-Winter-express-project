const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const instructors = await prisma.instructor.findMany();
    res.render('instructor', { instructors });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, introduction } = req.body;
    const newInstructor = await prisma.instructor.create({
      data: {
        instructor_name: name,
        instructor_email: email,
        instructor_introduction: introduction,
      },
    });
    res.redirect('/instructors');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
