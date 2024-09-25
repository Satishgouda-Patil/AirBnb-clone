const express = require("express");
const User = require("../models/user.js");
const passport = require("passport");
const wrapasync = require("../util/wrapasync.js");
const route = express.Router();
// const isAuth=require("../authMiddleware.js").isAuth;
// const flash = require('connect-flash');
// const session = require('express-session');
// const app = express();

// app.set('view engine', 'ejs');


// Middleware
// app.use(express.urlencoded({ extended: true }));

// 1 Middleware setup
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

//2 it is used in main app.ja
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false
// }));

//3 it is used in main app.ja

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(flash());







// Routes
route.get("/register", (req, res) => {
    res.render("user/register.ejs");
});

route.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

route.post("/login", passport.authenticate('local', {successRedirect: '/auth/suc',failureRedirect: '/auth/fail'}));




route.post("/register", wrapasync(async (req, res,) => {
    try {
        let {username, password} = req.body;
        if(username.trim()==0 || password.trim()==0) {
           throw new Error("white spaces are not considerd as password ");
        }
        const newUser = new User({ username: req.body.username });
        await User.register(newUser, req.body.password);
        res.redirect("/auth/login");
    } catch (Error) {
        req.flash("err", "Something went wrong pls try again");
        res.redirect("/auth/register");
    }
}));


route.get("/suc", (req, res) => {
    req.flash("suc", "Logged in successfully");
    res.redirect("/listing");
    
});

route.get("/fail", (req, res) => {
    req.flash("err", "Password or Username was wrong");
    res.redirect("/auth/login");
});

route.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/listing');
    });
  });

module.exports = route;
