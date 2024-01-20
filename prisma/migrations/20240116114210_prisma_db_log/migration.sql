-- CreateTable
CREATE TABLE `Student` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_name` VARCHAR(191) NOT NULL,
    `student_email` VARCHAR(191) NOT NULL,
    `student_age` VARCHAR(191) NOT NULL,
    `student_aspiration` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `instructor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `instructor_name` VARCHAR(191) NOT NULL,
    `instructor_email` VARCHAR(191) NOT NULL,
    `instructor_introduction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`instructor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `student_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,

    PRIMARY KEY (`student_id`, `instructor_id`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(191) NOT NULL,
    `course_description` VARCHAR(191) NOT NULL,
    `course_duration` VARCHAR(191) NOT NULL,
    `course_price` INTEGER NOT NULL,

    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `Instructor`(`instructor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
