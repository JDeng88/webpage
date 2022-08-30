const bcrypt = require('bcryptjs')
const Users = require('./models/Users')
const mongoose = require('mongoose')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin", salt);

const db = 'mongodb://localhost:27017/werdnadb'

mongoose
    .connect(db)
    .then(() => console.log('Sucessfuly connected to database'))
    .catch(err => console.log(err))

Users.create({
    name: "admin",
    phone_number: 3475024539,
    isAdmin: true,
    password: hash,
    initalized: true,
    access_code: "hi mom"
})