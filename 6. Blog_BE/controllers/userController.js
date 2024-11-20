const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Render signup page
exports.renderSignup = (req, res) => {
  res.render('signup');
};

// Render login page
exports.renderLogin = (req, res) => {
  res.render('login');
};

// User signup
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).redirect('/users/login');
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    req.session.user = user;
    res.status(200).redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// User logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/users/login');
};