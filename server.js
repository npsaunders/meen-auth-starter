// DEPENDENCIES
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config();
const session = require('express-session');


// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//DATABASE CONNECTION ERROR / SUCCESS
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));



// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));
// app.use('/sessions', sessionsController);


//Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port...${PORT};`)
})