const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EnrollmentModel {
  async getAllEnrollments() {
    return prisma.enrollment.findMany({
      include: {
        student: true,
        instructor: true,
        course: true,
      },
    });
  }

  async createEnrollment(studentId, instructorId, courseId) {
    return prisma.enrollment.create({
      data: {
        student_id: studentId,
        instructor_id: instructorId,
        course_id: courseId,
      },
    });
  }

  async updateEnrollment(enrollmentId, data) {
    try {
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          enrollment_id: enrollmentId,
        },
      });
  
      if (!existingEnrollment) {
        throw new Error('Enrollment not found');
      }
  
      return prisma.enrollment.update({
        where: {
          enrollment_id: enrollmentId,
        },
        data: {
          student_id: data.studentId,
          instructor_id: data.instructorId,
          course_id: data.courseId,
        },
      });
    } catch (error) {
      throw new Error(`Error updating enrollment: ${error.message}`);
    }
  }
  

  async deleteEnrollment(enrollmentId){
    return prisma.enrollment.delete({
      where:{
        enrollment_id: enrollmentId,
      },
    });
  }
}

module.exports = EnrollmentModel;
