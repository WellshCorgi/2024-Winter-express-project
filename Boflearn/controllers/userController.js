// controllers/userController.js
const UserModel = require('../models/userModel');

class UserController {
  static async register(req, res) {
    const { email, password, name, role } = req.body;

    try {
      const user = await UserModel.createUser(email, password, name, role);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
