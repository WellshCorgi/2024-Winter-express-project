// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

class AuthController {
  static async login(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);
      const validPassword = await bcrypt.compare(password,user.password)
      if (!validPassword) {
        console.log(password, user.password,bcrypt.compare(password, user.password))

        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // 토큰을 클라이언트에게 전송하기
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 유효 1시간

      res.redirect('/')
      // 이후 토큰 전송 확인후 '/'에서 세션 유지
      //res.json({ success: true, token }); 토큰 확인용 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static logout(req, res) {
    res.clearCookie('jwt');
    res.redirect('/');
  }
}

module.exports = AuthController;
