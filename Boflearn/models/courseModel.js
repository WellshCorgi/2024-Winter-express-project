const { PrismaClient } = require('@prisma/client');
const { deleteCourse } = require('../controllers/courseController');
const prisma = new PrismaClient();

class CourseModel {
  async getAllCourses() {
    return prisma.course.findMany();
  }

  async createCourse(name, description, duration, price) {
    return prisma.course.create({
      data: {
        course_name: name,
        course_description: description,
        course_duration: duration,
        course_price: price,
      },
    });
  }

  async updateCourse(courseId, data) {
    try {
      const existingCourse = await prisma.course.findUnique({
        where: {
          course_id: courseId,
        },
      });

      if (!existingCourse) {
        throw new Error('Course not found');
      }

      return prisma.course.update({
        where: {
          course_id: courseId,
        },
        data: {
          course_name: data.name,
          course_description: data.description,
          course_duration: data.duration,
          course_price: data.price,
        },
      });
    } catch (error) {
      throw new Error(`Error updating course: ${error.message}`);
    }
  }

  async deleteCourse(courseId){
    return prisma.course.delete({
      where:{
        course_id: courseId
      },
    });
  }
}

module.exports = CourseModel;
