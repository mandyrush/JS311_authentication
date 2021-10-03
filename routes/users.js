const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const middleware = require('../middleware/auth');

// GET  - Route that anyone can access
router.get('/users', controller.users);

// Get a user by their id
router.get('/users/:user_id', controller.getUser);

// Create new user - check JWT token for appropriate role
router.post('/createUser', [middleware.checkJWT, middleware.isAdmin], controller.createUser);

module.exports = router;