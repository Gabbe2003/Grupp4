const User = require("../models/user");
const validator = require("validator");

const registerUser = async (req, res) => {
  let { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  username = validator.trim(validator.escape(username));
  email = validator.normalizeEmail(validator.trim(email), {
    gmail_remove_dots: false,
  });
  password = validator.escape(password);
  confirmPassword = validator.escape(confirmPassword);

  if (!validator.isEmail(email)) {
    const message =
      email.trim() === ""
        ? "Email field is empty."
        : "Please enter a valid email address.";
    return res.status(400).json({ message: message });
  }

  const passwordStrengthRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;

  if (!passwordStrengthRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password does not meet the strength requirements. It must be at least 4 characters long, include a number, an uppercase letter, and a lowercase letter.",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords must match" });
  }

  const duplicator = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username }],
  }).exec();

  if (duplicator) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new User({
    username: username,
    email: email.toLowerCase(),
    password: password,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create the User" });
  }
};

module.exports = { registerUser };
