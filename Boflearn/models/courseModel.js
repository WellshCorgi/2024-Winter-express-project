// models/courseModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CourseModel {
  static async createCourse(title, description, price, url, instructorId) {
    return prisma.course.create({
      data: {
        title,
        description,
        price,
        url,
        instructorId,
      },
    });
  }

  static async getAllCourses() {
    return prisma.course.findMany();
  }
}

module.exports = CourseModel;
