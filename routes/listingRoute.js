const express=require("express")
const route=express.Router()
const app= express();
const flash = require('connect-flash');
const isAuth=require("../authMiddleware.js").isAuth;
// const path=require("path")
// const methodOverride=require("method-override")
// const ejsMate = require('ejs-mate');
// const ejs=require("ejs")
// const User = require("../models/user.js");
// const passport = require("passport");
// const userRoute=require("../routes/userRoute.js")


// Requirements for listing Routes
const wrapasync=require("../util/wrapasync.js")
const listing=require("../models/listeings.js")
const Review=require("../models/review.js")

// app.set("view engine","ejs")
// app.set("views" ,path.join(__dirname,"../views") )
// app.use(express.urlencoded({extended:true}))
// app.engine('ejs', ejsMate);
// app.use(express.static(path.join((__dirname,"../public"))))
// app.use('/css', express.static(path.join(__dirname, '../public/css')));
// app.use('/js', express.static(path.join(__dirname, '../public/js')));
// app.use(methodOverride('_method'))


route.get("", async function(req, res,next){
    let data=await listing.find({});
    res.render("listing/index.ejs",{data})
   }
 )

route.get("/new",isAuth,(req,res,next)=>{
    res.render("listing/new.ejs")
 })

route.post("", isAuth,wrapasync(
    async (req,res,next)=>{
    let list=req.body.listing;
    if(!list){
        throw new expressError(400,"send valid data")
    }

    let newData=new listing(list)
    if(!newData.title){
        throw new expressError("title is missing")
    }

    if(!newData.description){
        throw new expressError("desc is missing")
    }

    if(!newData.location){
        throw new expressError("location is missing")
    }

    if(!newData.country){
        throw new expressError("country is missing")
    }
    newData.owner=req.user._id;
    await newData.save()
    req.flash("suc","A new listing successfully")
    res.redirect("/listing")
  })
 )

route.get("/:id", 
    wrapasync(
        async (req,res)=>{
            let {id}=req.params;
            let result=await listing.findById(id).populate({
                path:"reviews",
                populate:{
                    path:"revOwner",
                }
            }).populate("owner")
            console.log(result)
            if(!result){
                req.flash("err","A listing was deleted ")
                res.redirect("/listing")
            }
            res.render("listing/show.ejs",{result})
        }
  )
 )

route.get("/:id/edit",isAuth,
    wrapasync(
            async (req,res)=>{
            let {id}=req.params;
            let result=await listing.findById(id);
            if(!result){
                req.flash("err","A listing not found!")
                res.redirect("/listing")
            }
            res.render("listing/edit.ejs",{result})
        }
    )
)

route.put("/:id",isAuth,wrapasync(async (req,res)=>{
    let {id}=req.params;
    let result=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(!result){
        req.flash("err","A listing not found!")
        res.redirect("/dialogflow/textQuery")
        throw new expressError(400,"send valid data")
    }
    result.save();
    req.flash("suc","A  listing updated successfully")
    res.redirect("/listing")
    }
 ))

route.get("/:id/delete",isAuth,wrapasync(async (req,res)=>{
    let {id}=req.params;
    let listResult=await listing.findById(id);
    await listing.findByIdAndDelete(id,{...req.body.listing});
    await Review.deleteMany({ _id: { $in: listResult.reviews } });
    req.flash("suc","A  listing deleted successfully")
    res.redirect("/listing")
    }
 ))

app.all("*",(req,res,next)=>{
    next(new expressError(404,"page not found"))
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="don't no"}=err;
    res.status(statusCode).render("listing/error.ejs",{err})
})

module.exports = route;

