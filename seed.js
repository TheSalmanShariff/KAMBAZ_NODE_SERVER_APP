import mongoose from 'mongoose';
import dotenv from 'dotenv';
import courses from './Kambaz/Database/courses.js';
import modules from './Kambaz/Database/modules.js';
import assignments from './Kambaz/Database/assignments.js';
import users from './Kambaz/Database/users.js';
import enrollments from './Kambaz/Database/enrollments.js';

// Import your models
import courseModel from './Kambaz/Courses/model.js';
import moduleModel from './Kambaz/Modules/model.js';
import assignmentModel from './Kambaz/Assignments/model.js';
import userModel from './Kambaz/Users/model.js';
import enrollmentModel from './Kambaz/Enrollments/model.js';

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await courseModel.deleteMany({});
    await moduleModel.deleteMany({});
    await assignmentModel.deleteMany({});
    await userModel.deleteMany({});
    await enrollmentModel.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await userModel.insertMany(users);
    console.log('✅ Seeded users');

    await courseModel.insertMany(courses);
    console.log('✅ Seeded courses');

    await moduleModel.insertMany(modules);
    console.log('✅ Seeded modules');

    await assignmentModel.insertMany(assignments);
    console.log('✅ Seeded assignments');

    await enrollmentModel.insertMany(enrollments);
    console.log('✅ Seeded enrollments');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();