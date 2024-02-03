
/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course with title, description, price, and URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Course created successfully
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /course/all:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a list of all courses
 *     responses:
 *       '200':
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               courses:
 *                 - title: Course 1
 *                   description: Description 1
 *                   price: 29.99
 *                   url: https://example.com/course1
 *                 - title: Course 2
 *                   description: Description 2
 *                   price: 39.99
 *                   url: https://example.com/course2
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

/**
 * @swagger
 * /course/enroll/{id}:
 *   post:
 *     summary: Enroll in a course
 *     description: Enroll in a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Course ID to enroll in
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Enrolled in the course successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Enrolled in the course successfully
 *       '400':
 *         description: Already enrolled in this course
 *         content:
 *           application/json:
 *             example:
 *               error: Already enrolled in this course
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

// routes/courseRouter.js
const express = require('express');
const CourseController = require('../controllers/courseController');
const router = express.Router();

router.post('/create', CourseController.createCourse);
router.get('/create', (req, res) => {
    res.render('createCourse', { loggedIn: res.locals.loggedIn, userRole: res.locals.userRole,userId: res.locals.userId });
});
  
router.get('/all', CourseController.getAllCourses);
router.post('/enroll/:id', CourseController.enrollCourse);
module.exports = router;
