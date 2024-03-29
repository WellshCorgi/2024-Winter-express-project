// controllers/userController.js
const UserModel = require('../models/userModel');

class UserController {
  static async register(req, res) {
    const { email, password, name, role } = req.body;

    try {
      const user = await UserModel.createUser(email, password, name, role);
      res.redirect('/');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {
    const userId = Number(req.params.id);

    try {
      const deletedUser = await UserModel.deleteUserById(userId);
      // 사용자 삭제 후 로그아웃
      res.clearCookie('jwt');
      
      res.redirect('/');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
