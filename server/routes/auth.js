const express = require('express');
const router = express.Router();
const passport = require('passport');
const generator = require('generate-password');
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10
const LocalStrategy = require('passport-local')


router.post("/login", (req, res, next) => { 
    passport.authenticate("local", function(err, user, info) {
        console.log('user is', user)

        if (err) {
            console.log(err)
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            console.log('no user fouund')
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log('user found, error')
                return res.status(400).json({ errors: err });
            }
            console.log(user.isAdmin, 'user is admin')
            if (user.isAdmin){
                req.session.isAdmin = true
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next)
})

router.get("/isAdmin", function(req, res){
    console.log('isadmin route called')
    console.log(req.sessionID, 'is session id')
    if (req.isAuthenticated()){
        console.log('admin found')
        res.send({
            isAdmin: true
        })
    } else {
        console.log('admin not found, user is', req.user)
        res.send({
            isAdmin: false
        })
    }
    
})

router.post("/signup", function(req, res){
    if (req.body.password == null || req.body.phone_number == null){
        res.send('enter all fields')
    }
    User.findOne({code: req.body.code})
        .then(user => {
            if (user == null){
                res.send('User not found')
            }
            var hashed_password;
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                user.password = hashed_password;
            })
            user.phone_number = req.body.phone_number
            user.intialized = true
            user.save()
            .then(() => {
                res.send('sucessfuly signed up')
            })       

        })
})

router.post("/createUser", function(req, res){
    const generateUser = () => {
        var user_code = generator.generate({
            length: 20,
            numbers: true,
            symbols: true,
        })
        console.log('code generated is ', user_code)
        User.findOne({access_code: user_code})
            .then(user => {
                console.log(user)
                if (user == null){
                    console.log('user not found')
                    User.create({access_code: user_code, name: req.body.name})
                    console.log('user created')
                    res.end()
                } else {
                    generateUser()
                }
        })
    }
    generateUser()
})


module.exports = router