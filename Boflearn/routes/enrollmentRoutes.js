const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);
router.post('/', enrollmentController.createEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);
router.put('/:id',enrollmentController.updateEnrollment)

module.exports = router;
