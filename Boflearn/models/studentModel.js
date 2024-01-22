const { PrismaClient } = require('@prisma/client');
const { deleteStudent } = require('../controllers/studentController');
const prisma = new PrismaClient();

class StudentModel {
  async getAllStudents() {
    return prisma.student.findMany();
  }

  async createStudent(name, email, age, aspiration) {
    return prisma.student.create({
      data: {
        student_name: name,
        student_email: email,
        student_age: age,
        student_aspiration: aspiration,
      },
    });
  }

  async updateStudent(studentId, data) {
    try {
      const existingStudent = await prisma.student.findUnique({
        where: {
          student_id: studentId,
        },
      });

      if (!existingStudent) {
        throw new Error('Student not found');
      }

      return prisma.student.update({
        where: {
          student_id: studentId,
        },
        data:{
          student_name: data.name,
          student_email: data.email,
          student_age: data.age,
          student_aspiration: data.aspiration,
        },
      });
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  }

  async deleteStudent(studentId){
    return prisma.student.delete({
      where:{
        student_id: studentId,
      },
    });
  }
}

module.exports = StudentModel;
