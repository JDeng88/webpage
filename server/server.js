const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')

dotenv.config();



const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
}));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../client/build")));


const port = process.env.PORT || 8088;

const db = process.env.DB_URI;

mongoose
    .connect(db)
    .then(() => console.log('Sucessfuly connected to database'))
    .catch(err => console.log(err))


app.use('/api', auth)


app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});



app.listen(port, () => {
    console.log('Listening on port', port)
})

