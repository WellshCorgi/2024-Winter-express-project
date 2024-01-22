const EnrollmentModel = require('../models/enrollmentModel');
const enrollmentModel = new EnrollmentModel();

exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await enrollmentModel.getAllEnrollments();
    res.render('enrollments', { enrollments });
  } catch (error) {
    next(error);
  }
};

exports.createEnrollment = async (req, res, next) => {
  try {
    const { studentId, instructorId, courseId } = req.body;
    await enrollmentModel.createEnrollment(studentId, instructorId, courseId);
    res.redirect('/enrollments');
  } catch (error) {
    next(error);
  }
};

exports.updateEnrollment = async (req, res, next) => {
  try {
    const enrollmentId = parseInt(req.params.id, 10);
    const { studentId, instructorId, courseId } = req.body;

    await enrollmentModel.updateEnrollment(enrollmentId, {
      student_id: studentId,
      instructor_id: instructorId,
      course_id: courseId,
    });

    res.redirect('/enrollments');
  } catch (error) {
    next(error);
  }
};


exports.deleteEnrollment = async (req, res, next) => {
  try{
    const enrollmentId = parseInt(req.params.id,10);
    await courseModel.deleteEnrollment(enrollmentId);

    res.status(204).send();
  }catch(error){
    next(error);
  }

}