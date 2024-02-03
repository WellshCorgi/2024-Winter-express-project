// controllers/courseController.js
const CourseModel = require('../models/courseModel');
const EnrollmentModel = require('../models/enrollmentModel');

class CourseController {
  static async createCourse(req, res) {
    const { title, description, price, url } = req.body;
    const instructorId = req.session.userId; 

    try {
      const numericPrice = Number(price);
      await CourseModel.createCourse(title, description, numericPrice, url, instructorId);
      res.redirect('/');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getAllCourses(req, res) {
    try {
      const courses = await CourseModel.getAllCourses();
      res.render('allCourses', { loggedIn: res.locals.loggedIn, userRole: res.locals.userRole, userId: res.locals.userId, courses });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async enrollCourse(req, res) {
    const courseId = parseInt(req.params.id);
    const userId = Number(req.session.userId);

    try {
      const existingEnrollment = await EnrollmentModel.getEnrollmentByUserAndCourse(userId, courseId);

      if (existingEnrollment) {
        // db 중복 체크 확인 (중복 수강신청 예외처리)
        return res.status(400).json({ error: 'Already enrolled in this course' });
      }
      await EnrollmentModel.createEnrollment(courseId, userId);
      res.redirect('/course/all');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CourseController;
