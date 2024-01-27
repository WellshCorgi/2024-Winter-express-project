// models/userModel.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

class UserModel {
  static async createUser(email, password, name, role) {
    console.log(password);
    try {
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 3);

      return await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
 //로그인할때 참조하는 유니크 값
  static async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}

module.exports = UserModel;
