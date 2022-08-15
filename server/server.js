const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('./passport/setup')
const auth = require('./routes/auth')
const session = require('express-session')


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.SERVER_PORT;

const db = process.env.DB_URI;

mongoose
    .connect(db)
    .then(() => console.log('Sucessfuly connected to database'))
    .catch(err => console.log(err))


app.use(
    session({
        secret: 'fat werdna is very fat lmao'     
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', auth)


app.listen(port, () => {
    console.log('Listening on port', port)
})




//TODO: prevent duplicates in db