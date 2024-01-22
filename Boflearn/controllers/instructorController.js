const { __esModule } = require('prisma');
const InstructorModel = require('../models/instructorModel');
const { deleteStudent } = require('./studentController');
const instructorModel = new InstructorModel();

exports.getAllInstructors = async (req, res, next) => {
  try {
    const instructors = await instructorModel.getAllInstructors();
    res.render('instructor', { instructors });
  } catch (error) {
    next(error);
  }
};

exports.createInstructor = async (req, res, next) => {
  try {
    const { name, email, introduction } = req.body;
    await instructorModel.createInstructor(name, email, introduction);
    res.redirect('/instructors');
  } catch (error) {
    next(error);
  }
};

exports.updateInstructor = async (req, res, next) => {
  try {
    const instructorId = parseInt(req.params.id, 10);
    const { name, email, introduction } = req.body;

    await instructorModel.updateInstructor(instructorId,{name, email, introduction});

    res.redirect('/instructors');
  } catch (error) {
    next(error);
  }
};


exports.deleteInstructor = async (req, res, next) => {
  try{
    const instructorId = parseInt(req.params.id,10);
    await instructorModel.deleteInstructor(instructorId);

    res.status(204).send();
  }catch(error){
    next(error);
  }
};

