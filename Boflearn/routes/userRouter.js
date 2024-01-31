// routers/userRouter.js
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/delete/:id', UserController.deleteUser);

module.exports = router;
