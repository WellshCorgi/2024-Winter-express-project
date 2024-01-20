const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.render('students', { students });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, age, aspiration } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        student_name: name,
        student_email: email,
        student_age: age,
        student_aspiration: aspiration,
      },
    });
    res.redirect('/students');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
