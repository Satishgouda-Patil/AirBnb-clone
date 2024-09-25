const express=require("express")
const app= express();
const cookiesParser= require("cookie-parser")
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path")

app.use(cookiesParser("secratecode"));

app.set("view engine","ejs")
app.set("views" ,path.join(__dirname,"views") )

//using session
const data={
    secret: "abc",
    resave: false,
    saveUninitialized: true,
};
app.use(session(data))

// using flash
app.use(flash())

//using  middlewares
app.use((req, res, next) => {
    res.locals.sucMsg=req.flash("suc")
    res.locals.failMsg=req.flash("fail")
    next();
})

//demonstration of session ex 1
app.get("/count", function(req, res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`you are visited ${req.session.count} times` );
})

//demonstration of session ex 2

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    if(name==="anonymous"){
        req.flash("fail","you are not registered")
    }else{
        req.flash("suc","you are registered successfully")
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
})



//sending cookies to browser
app.get("/sample1",(req,res)=>{
    // res.cookie("city", "hubli")
    // res.cookie("satish", "patil")
    //many more
    res.send("welcome to sample1 page")
})

//extracting cookies from web browser using cookie-parser packages
app.get("/sample2",(req,res)=>{
    console.log(req.cookies)
    res.send("welcome to sample 2")
})

app.get("/greeting",(req,res)=>{
    let {name}=req.query;
    res.send(`hello Namaste! "${name}"`)
})

//signed cookies by using "secratecode"
app.get("/getSignCookies",(req,res)=>{
    res.cookie("color","blue",{signed:true})
    res.send("signed cookies");
})

//verifying the cookies
app.get("/verify",(req,res)=>{
    console.log(req.cookies)
    res.send("verifying")
})

app.listen(3000,()=>{
})