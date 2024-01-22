const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getIndexPage = async (req, res, next) => {
  try {
    const title = 'Boflearn Main Page'; // 여기에 title 변수 정의
    res.render('index', { title });
  } catch (error) {
    next(error);
  }
};