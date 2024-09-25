const mongoose=require("mongoose")
const schema=mongoose.Schema;
const reviewSchema=new schema({
    // by:{
    //     type:schema.Types.ObjectId,
    //     ref: "User",
    //   },
    revStar:{
        type: Number,
        max:5,
    },
    message:String,
    revOwner:{
        type: schema.Types.ObjectId,
        ref:"User",
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 