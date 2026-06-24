const bcrypt = require("bcryptjs");
const User = require("../models/user");

const seedUser = async () => {
  try {
    const existingUser = await User.findOne({
      email: "admin@test.com",
    });

    if (existingUser) {
      console.log("Default user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "123456",
      10
    );

    await User.create({
      email: "admin@test.com",
      password: hashedPassword,
    });

    console.log("Default user created");
  } catch (error) {
    console.error("Seeder error:", error);
  }
};

module.exports = seedUser;