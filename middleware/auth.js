const jwt = require("jsonwebtoken");
require('dotenv').config();
let jwtSecret = process.env.JWT_SECRET;

let isAdmin = (req, res, next) => {
    if(req.isAdmin) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

// Middlware to call when processing an authorized URL
let checkJWT = (req, res, next) => {
    console.log("Processing JWT authentication check");

    // read the token from the header
    let token;
    if (req.headers.authorization) {
        let bearer = req.headers.authorization.split(' ');
        token = bearer[1];
    } else {
        token = null;
    }

    // if the token is not valid, there is nothing to check
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (error, decoded) => {
        if (error) {
            console.log("Could not verify jwt ", error);
            return res.status(401).send("Unauthorized");
        }

        // the toekn is valid, store the username from the token 
        // in the request, so that it is available to all forllowing this call
        console.log(decoded);
        req.username = decoded.username;
        req.isAdmin = decoded.role == 'admin';
        // call the next middleware function in the chain
        next();
    });
}

module.exports = {
    isAdmin,
    checkJWT
}