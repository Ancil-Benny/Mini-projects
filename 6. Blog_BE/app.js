const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up session management
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to make user data available in templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/files', fileRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/posts');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;