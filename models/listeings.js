const mongoose=require("mongoose")
const Review=require("./review.js")
const user=require("./user.js")

const schema=mongoose.Schema;

// Define schema
const listingSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description:String,
  Image: {
    type: String,
    default: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (value) => value === "" ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : value
},
  price:Number,
  location:String,
  country:String,
  reviews:[{
    type:schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
    type:schema.Types.ObjectId,
    ref:"User",
  }
});

// Create a model from the schema
const listing = mongoose.model('listing', listingSchema);

module.exports = listing;
