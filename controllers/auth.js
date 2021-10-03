const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

let login = (req, res) => {
    console.log('Login Route: ', req.body.username);

    // Get the username and password from the request
    const username = req.body.username;
    const password = req.body.password;

    let sql = 'SELECT username, password_hash, role FROM users_amanda WHERE username = ?';

    let params = [];
    params.push(username);

    // select username, role and stored hash from the db for the user passed in
    db.query(sql, params, (error, rows) => {
        // assume the provided password is bad
        let goodPassword = false;
        let role;

        // if the database failed then log an error
        if (error) {
            console.error('Error when querying the db', err);
        }

        // if the database returned too many rows then log the error
        if (rows.length > 1) {
            console.error("Found too many rows with the username ", username);
        }

        // if the database returned no rows, then log it, but its not an error
        // maybe the username never signed up with our application
        if (rows.length == 0) {
            console.log('Did not find a row with this username ', username);
        }

        // if query ran without an error, and only 1 row came back,
        // then check the stored hash against the password provided in the request
        if (!error && rows.length == 1) {
            row = rows[0];

            // get the stored hash from the database
            let hash = row.password_hash;

            // get the role from the database
            role = row.role;

            // check that the hash in the database matches the password provided
            goodPassword = bcrypt.compareSync(password, hash);
        }

        // if the password provided is good then return a signed copy of the access token
        if (goodPassword) {
            // the token should include things that you are sending back to the client
            // which include the username and role
            // not a good idea to send the password or the hash of the password back
            const unsignedToken = {
                username: username,
                role: role
            };
            // sign the token using the JWT secret
            let jwtSecret = process.env.JWT_SECRET;
            const accessToken = jwt.sign(unsignedToken, jwtSecret);

            // send the signed token back
            res.json(accessToken);
        } else {
            // if the password provided was not good, or was not able to be verified
            // send an unauthorized message and code back
            res.status(401).send("Unauthorized");
        }
    });
}

let authCheck = (req, res) => {
    console.log('Successful Authorization Check Route');
    res.json(`Successfully passed the authorization check, ${req.username}`);
}

module.exports = {
    login,
    authCheck
}