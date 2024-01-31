// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials(User)' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // 토큰을 클라이언트에게 전송하기
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 유효 1시간
      
      // 세션에 userId 저장
      if (req.session) {
        req.session.userId = user.id;
        req.session.userRole = user.role;
      }
      console.log(req.session.userId)
      res.redirect('/');
      //res.render('index', { loggedIn: true, userId:user.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
    
    
  }

  static logout(req, res) {
    req.session.userId = null; // 유저 아이디 세션 초기화
    res.clearCookie('jwt');
    res.redirect('/');
  }
}

module.exports = AuthController;
