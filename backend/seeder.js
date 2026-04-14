require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany(); // Clear existing

    const users = [
      {
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      },
      {
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
      }
    ];

    for (const u of users) {
      await User.create(u);
    }
    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedData();
