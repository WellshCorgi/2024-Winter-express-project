// models/EnrollmentModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EnrollmentModel {
  static async createEnrollment(courseId, userId) {
    return prisma.enrollment.create({
      data: {
        courseId,
        userId,
      },
    });
  }
}

module.exports = EnrollmentModel;
