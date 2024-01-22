const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.get('/', instructorController.getAllInstructors);
router.post('/', instructorController.createInstructor);
router.delete('/:id', instructorController.deleteInstructor);
router.put('/:id', instructorController.updateInstructor);

module.exports = router;

