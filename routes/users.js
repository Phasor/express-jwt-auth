const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// adding passport.authenticate() middleware calls the verify callback in the JWT strategy in config/passport.js
router.get('/protected', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    res.status(200).json({success: true, message: 'You are authorized'});
});

// TODO
router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username})
    .then((user) => {

        if(!user) {
            return res.status(401).json({ success: false, mge: 'User not found' });
        }

        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
        if(isValid) {
            // valid user, give them a jwt so they don't need to login all the time
            const tokenObject = utils.issueJWT(user);

            res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
        } else{
            res.status(401).json({ success: false, msg: 'You entered the wrong password' });
        }
    })
    .catch((err) => {
        next(err);
    });

});

// TODO
router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    newUser.save()
        .then(user => {
            const jwt = utils.issueJWT(user);
            res.json({ success: true, user:user, token: jwt.token, expiresIn: jwt.expires });
        })
        .catch(err => {
            res.json({ success: false, msg: 'Failed to create user' });
        });
});

module.exports = router;