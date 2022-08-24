const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const Item = require('../models/Items')
const Order = require('../models/Orders')


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
//TODO: add image file parsing, busoy and filefs
module.exports = router;