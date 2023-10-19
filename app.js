const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Load passport configuration
require('./config/passport')(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set up your routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

// Render the home page when the root URL is accessed
app.get('/', (req, res) => {
  res.render('home');
});

// Use the routes
app.use('/auth', authRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*
Documentation:
========================================
Node.js application that sets up a web server using the Express.js framework and implements user authentication using the Passport.js library. It also demonstrates the use of EJS as a view engine for rendering web pages. Let's break down the code step by step:

Import Required Modules:

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
express: The Express.js web application framework.
session: Middleware for managing user sessions.
passport: Passport.js library for authentication.
LocalStrategy: A strategy for Passport.js to handle local (username and password) authentication.
GoogleStrategy: A Passport.js strategy for Google OAuth 2.0 authentication.
User: A custom model or module for managing user data.
Create an Express Application:

const app = express();
This line initializes an Express application.
Set EJS as the View Engine:

app.set('view engine', 'ejs');
This sets EJS (Embedded JavaScript) as the template engine for rendering dynamic web pages.
Load Passport Configuration:

require('./config/passport')(passport);
This line loads the Passport.js configuration from a separate file located at './config/passport'. This configuration sets up authentication strategies, serialization, and deserialization of user data.
Middleware Setup:

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
Middleware functions are configured for the Express application:
express.urlencoded: Middleware to parse URL-encoded request bodies.
express.static: Serves static files (e.g., CSS, JavaScript) from the 'public' directory.
express-session: Initializes session management with a secret key.
passport.initialize(): Initializes Passport.js for authentication.
passport.session(): Middleware to manage persistent login sessions.
Define Routes:

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
Route modules for authentication and dashboard functionality are imported.
Home Page Route:

app.get('/', (req, res) => {
  res.render('home');
});
When the root URL '/' is accessed, it renders the 'home' page using the EJS view engine. This route is a placeholder for your application's home page.
Use Route Modules:

app.use('/auth', authRoutes);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
The route modules are mounted at specific paths:
Authentication routes are mounted under '/auth'.
Additional routes are mounted under '/dashboard' or other appropriate paths as defined in the route modules.
Start the Server:

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
The server is started on the specified port (3000 by default) or the port defined in the PORT environment variable.
A message is logged to indicate that the server is running.
In summary, this code sets up a web server using Express.js, integrates user authentication with Passport.js (supporting both local and Google OAuth 2.0 strategies), and defines routes for different parts of the application. It also serves static files, uses sessions for user management, and renders dynamic pages using the EJS template engine. The actual authentication and route logic are implemented in separate route and configuration files, which are imported and used in this main application file.

*/