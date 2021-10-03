let db = require('../db/db');
let bcrypt = require('bcrypt');

let users = (req, res) => {
    console.log('GET all users route');
    res.json('Got all users');
}

let getUser = (req, res) => {
    console.log("GET/getUser", req.user_id);

    let id = req.params.user_id;

    let sql = `SELECT * from amanda_users where id = ?`;
    let params = [id];

    db.query(sql, params, (error, rows) => {
        if (error) {
            console.error("Error when fetching user by id", error);
            res.sendStatus(500);
        } else if (rows.length > 1) {
            console.error("Too may users returned for the id ", id);
            res.sendStatus(500);
        } else if (rows.length == 0) {
            console.error(`No user for id ${id} found`);
            res.status(401).json(null);
        } else if ( rows.length == 1){
            res.json(rows[0]);
        }
    });
}

let createUser = (req, res) => {
    console.log("POST/createUser ", req.body.username);
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    // make sure that the password and confirm password are the same
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    // generate the hash of the password that will be stored in the database
    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = 'INSERT INTO users_amanda(username, password_hash, role) values(?, ?, ?);';
    db.query(sql, [username, passwordHash, 'user'], (error, rows) => {
        // if the insert query returned an error, we log the error
        // and returna  failed message back
        if (error) {
            console.error("Failed to add user", error);
            res.status(500).send("Failed to add user");
        } else {
            // if the insert statement ran without an error then the user was created
            res.send("User Created");
        }
    })
}

module.exports = {
    users,
    getUser,
    createUser
}