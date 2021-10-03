const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth');
const middleware = require('../middleware/auth');

// Login
router.post('/login', controller.login);

// GET /authOnly - This is only available to authenticated users
// Returns a success message that includes the username based on the JWT token
router.get('/authOnly', middleware.checkJWT, controller.authCheck);

module.exports = router;