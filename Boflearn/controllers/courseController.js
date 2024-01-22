const CourseModel = require('../models/courseModel');
const courseModel = new CourseModel();

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.getAllCourses();
    res.render('course', { courses });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { name, description, duration, price } = req.body;
    await courseModel.createCourse(name, description, duration, price);
    res.redirect('/courses');
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const { name, description, duration, price } = req.body;

    await courseModel.updatecourse(courseId, {name, description, duration, price});

    res.redirect('/courses');
  } catch (error) {
    next(error);
  }
};



exports.deleteCourse = async (req, res, next) => {
  try{
    const courseId = parseInt(req.params.id,10);
    await courseModel.deleteCourse(courseId);

    res.status(204).send();
  }catch(error){
    next(error);
  }

}
