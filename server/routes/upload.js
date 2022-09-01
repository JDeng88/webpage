const express = require('express')
const router = express.Router()
const Item = require('../models/Items')
const Order = require('../models/Orders')
// import { createReadStream } from 'fs';
// import { createModel } from 'mongoose-gridfs';
//TODO: implement whitelist for cors
const multiparty = require('multiparty')
const fs = require('fs')




//TODO: add image file parsing, busoy and filefs
module.exports = router;