const express=require("express")
const app= express();
const mongoose=require("mongoose")
const path=require("path")
const methodOverride=require("method-override")
const ejsMate = require('ejs-mate');
const ejs=require("ejs")
const session=require("express-session");
const flash=require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const route = express.Router();
const wrapasync = require("./util/wrapasync.js");


// const User=require("./models/user.js")
let mongoUrl="mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs")
app.set("views" ,path.join(__dirname,"views") )
app.use(express.urlencoded({extended:true}))
app.engine('ejs', ejsMate);
app.use(express.static(path.join((__dirname,"/public"))))
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use(methodOverride('_method'))


const listingRoute=require("./routes/listingRoute.js")
const reviewRoute=require("./routes/reviewRoute.js")
const userRoute=require("./routes/userRoute.js")


//connecting to mongodb 
async function main(){
    await mongoose.connect(mongoUrl)
}
main()
    .then((req, res) =>{
        console.log("db connoted")
    })

    .catch(function(err){
        console.log("error")
    })

//using session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// using flash
app.use(flash())


/***********************************************8 */
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/***********************************************8 */
//using  middlewares
app.use((req, res, next) => {
    res.locals.sucMsg=req.flash("suc")
    res.locals.errMsg=req.flash("err")
    res.locals.isLogin=req.isAuthenticated()
    res.locals.currentUser=req.user;
    next();
})

app.get("/", async function(req, res){
    res.send("it,s a home route")
} )




// listing Route
app.use("/listing",listingRoute)

// review Route
app.use("/listing",reviewRoute)


//authentication Route
app.use("/auth",userRoute)

//listening on the  port 3000
app.listen(3000, function() {
    console.log("listening")
})
