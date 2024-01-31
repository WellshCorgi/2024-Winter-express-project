// routes/courseRouter.js
const express = require('express');
const CourseController = require('../controllers/courseController');
const router = express.Router();

router.post('/create', CourseController.createCourse);
router.get('/create', (req, res) => {
    res.render('createCourse', { loggedIn: res.locals.loggedIn, userRole: res.locals.userRole,userId: res.locals.userId });
  });
  
module.exports = router;
