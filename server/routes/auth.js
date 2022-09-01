const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const generator = require('generate-password');
const User = require('../models/Users')
const Order = require('../models/Orders')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const Item = require('../models/Items')
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET


const verify_token = (req, res, next) => {
    var token = req.headers["token"];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log('decoded toekn is', decoded)
    } catch (err) {
        req.user = null;
        console.log('no token found')
    }
    return next();
}

router.post("/login", (req, res, next) => { 

    User.findOne({phone_number: req.body.phone_number})
    .then((user) => {
        if (user == null){
            res.status(403).json({"message": "The password or phone number is incorrect. Please try again."})
        }
        console.log('user user is ', user)
        var found_user = user; 
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result){ //unsure why user is not avaialble in if statement
                var token = jwt.sign(
                    {
                        name: found_user.name,
                        address: found_user.address,
                        isAdmin: found_user.isAdmin
                    },
                    JWT_SECRET, 
                    {
                        expiresIn: "24h"
                    }
                )
                res.json({token: token})
            } else {
                res.status(403).json({"message": "The password or phone number is incorrect. Please try again."})
            }
        })
    })
})

router.get("/isAdmin", verify_token, function(req, res){
    res.json({
        isAdmin: req.user != null && req.user.isAdmin
    })
})

router.get("/isUser", verify_token, function(req, res){
    res.json({
        isUser: req.user != null
    })
})

router.post("/signup", function(req, res){
    console.log('code is', req.body.code)
    User.findOne({
        access_code: req.body.code  
    })
    .then(user => {
        console.log(user)
        if (user == null){
            res.json({"message": "This code is invalid. Please try again"})
        } 
        else if (user.initialized){
            res.json({"message": "This account has already been activated. Please login instead."})
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                user.password = hash
            })
            user.phone_number = req.body.phone_number
            user.address = req.body.address
            user.initialized = true
            var token = jwt.sign(
                {
                    name: user.name,
                    address: user.address,
                    isAdmin: user.isAdmin
                },
                JWT_SECRET, 
                {
                    expiresIn: "24h"
                }
            )
            user.save()
            res.json({token: token})  
        }   
    })
})

router.post("/createUser", function(req, res){
    const generateUser = () => {
        var user_code = generator.generate({
            length: 20,
            numbers: true,
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


router.post("/createOrder", verify_token, function(req, res){
    //TODO: allow item duplicates
    
    const generateOrder = () => {
        var database_ids = req.body.cart.map(id => mongoose.Types.ObjectId(id))
        console.log(database_ids)
        var total_price = 0;
        Item.find({
            _id: {$in: req.body.cart}
        })
        .then((items) => {
            var item_names = [];
            for (var item of items){
                total_price += item.price
                item_names.push(item.name)
            }
            Order.create({
                customer: req.user.name,
                address: req.user.address,
                items: req.body.cart,
                total_price: total_price,
                item_names: item_names
            })
            .then(() => {
                console.log('order created')
                res.json({"message": "Order confirmed"})
            })
            .catch((err) => {
                console.log(err)
                res.json({"meesage": "Order did not go through. Please try again."})
            })
        })   
    }
    generateOrder()
})

router.post("/upload", function(req, res){
    var form_data = new multiparty.Form()
    form_data.parse(req, (err, fields, files) => {
        fs.readFile(files.image[0].path, (err, data) => {
            Item.create({
                name: fields.name[0],
                description: fields.description[0],
                price: fields.price[0],
                image: data
            })
            .then(() => {
                res.end()
            })
        })
    })
})



router.get("/customers", function(req, res){
    User.find()
    .then(userList => {
        res.send({users: userList})
    })
})

router.get("/inventory", function(req, res){
    Item.find()
    .then(itemList => {
        res.send({items: itemList})
    })
})

router.get("/orders", function(req, res){
    Order.find()
    .then(orderList => {
        res.send({orders: orderList})
    })
})


module.exports = router