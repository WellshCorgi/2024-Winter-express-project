const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class InstructorModel {
  async getAllInstructors() {
    return prisma.instructor.findMany();
  }

  async createInstructor(name, email, introduction) {
    return prisma.instructor.create({
      data: {
        instructor_name: name,
        instructor_email: email,
        instructor_introduction: introduction,
      },
    });
  }

  async updateInstructor(instructorId, data) {
    try {
      const existingInstructor = await prisma.instructor.findUnique({
        where: {
          instructor_id: instructorId,
        },
      });
  
      if (!existingInstructor) {
        throw new Error('Instructor not found');
      }
  
      return prisma.instructor.update({
        where: {
          instructor_id: instructorId,
        },
        data: {
          instructor_name: data.name, 
          instructor_email: data.email,
          instructor_introduction: data.introduction,
        },
      });
    } catch (error) {
      throw new Error(`Error updating instructor: ${error.message}`);
    }
  }
  
  

  async deleteInstructor(instructorId){
    return prisma.instructor.delete({
      where:{
        instructor_id: instructorId,
      },
    });
  }
}

module.exports = InstructorModel;
