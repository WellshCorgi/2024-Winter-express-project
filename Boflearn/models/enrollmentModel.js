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
  static async getEnrollmentByUserAndCourse(userId, courseId) {
    return prisma.enrollment.findUnique({
      where: {
        courseId_userId: {
          courseId: courseId,
          userId : userId,
        },
      },
    });
  }
}

module.exports = EnrollmentModel;
