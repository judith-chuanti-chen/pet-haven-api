const { User } = require('../models/user');
//Validate token:
//Server obtains the access token from the cookie and 
//checks it against the one in the database associated with that user. 
//If it checks out, access is granted.
let auth = (req, res, next) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.send('token validation failed');

        req.token = token;
        req.user = user;
        next();
    });
};
module.exports = {auth}