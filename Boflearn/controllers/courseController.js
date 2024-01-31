// controllers/courseController.js
const CourseModel = require('../models/courseModel');

class CourseController {
  static async createCourse(req, res) {
    const { title, description, price, url } = req.body;
    const instructorId = req.session.userId; // 현재 로그인된 선생님의 ID
    console.log(instructorId);
    

    try {
      const numericPrice = Number(price);
      await CourseModel.createCourse(title, description, numericPrice, url, instructorId);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CourseController;
