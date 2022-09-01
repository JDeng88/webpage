const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('./passport/setup');
const auth = require('./routes/auth');
const upload = require('./routes/upload')
const retrieve = require('./routes/retrieve')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')




// const helmet = require('helmet');
// const hpp = require('hpp');
// const csurf = require('csurf');

// app.use(helmet);

const MongoStore = require('connect-mongo');
const Item = require('./models/Items');


const session = require('express-session');
//const session = require('cookie-session');
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


app.use('/', auth)


app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});



app.listen(port, () => {
    console.log('Listening on port', port)
})




//TODO: prevent duplicates in db

//{"_id":"UHDQV44xD6Q3Yf_oKtOF5-p0enmUY6Od","expires":{"$date":{"$numberLong":"1662339324015"}},"session":"{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":true,\"httpOnly\":false,\"path\":\"/\",\"sameSite\":\"none\"},\"passport\":{\"user\":{\"intialized\":false,\"_id\":\"62faef0b26e46eca58b17d05\",\"name\":\"werdna\",\"access_code\":\"\",\"password\":\"$2a$10$z9Ey3Fz8i.r5BKGNfTHNke71FIWQObipywGRfzfxVngRCIqxraLYa\",\"phone_number\":3475024539,\"isAdmin\":true}},\"isAdmin\":true}"}