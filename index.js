const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require('path');
const fileUpload = require("express-fileupload");



const app = express();
const routes = require("./routes/admin");
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1h expire
        sameSite: true,
        secure: false
    },
    secret: "this is a secret key",
    name: 'sid'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

mongoose.connect('mongodb+srv://user1:User1234@cluster0.cqgou.mongodb.net/Account?retryWrites=true&w=majority', { useFindAndModify: false, useNewUrlParser: true })
    .then(result => {
        console.log("Db is connected");
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })