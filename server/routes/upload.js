const express = require('express')
const router = express.Router()
const Item = require('../models/Items')
const Order = require('../models/Orders')
// import { createReadStream } from 'fs';
// import { createModel } from 'mongoose-gridfs';
//TODO: implement whitelist for cors
const multiparty = require('multiparty')
const fs = require('fs')



router.post("/upload", function(req, res){
    var form_data = new multiparty.Form()
    form_data.parse(req, (err, fields, files) => {
        fs.readFile(files.image[0].path, (err, data) => {
            Item.create({
                name: fields.name[0],
                description: fields.description[0],
                image: data
            })
            .then(() => {
                res.end()
            })
        })
    })
})

router.post("/createOrder", function(req, res){
    Order.create({
        customer: req.body.customer,
        address: req.body.address,
        items: req.body.items,
        total_price: req.body.total_price
    })
    .then(() => {
        res.end()
    })
})

//TODO: add image file parsing, busoy and filefs
module.exports = router;