const mongoose=require("mongoose")
// const Review=require("./review.js")
// const user=require("./user.js")

const schema=mongoose.Schema;

// Define schema
const listingSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description:String,
  Image: {
    url:String,
    filename:String,
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
