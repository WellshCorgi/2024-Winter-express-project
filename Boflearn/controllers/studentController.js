const StudentModel = require('../models/studentModel');
const studentModel = new StudentModel();

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudents();
    res.render('students', { students });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const { name, email, age, aspiration } = req.body;
    await studentModel.createStudent(name, email, age, aspiration);
    res.redirect('/students');
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try{
    const studentId = parseInt(req.params.id,10);
    await studentModel.deleteStudent(studentId);

    res.status(204).send();
  }catch(error){
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const { name, email, age, aspiration } = req.body;

    await StudentModel.updateStudent(studentId, {name, email, age, aspiration});

    res.redirect('/students');
  } catch (error) {
    next(error);
  }
};
