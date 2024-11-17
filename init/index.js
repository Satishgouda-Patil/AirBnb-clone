const mongoose=require("mongoose")
const dataInit=require("../init/data.js")
const listing=require("../models/listeings.js");
const data = require("./data.js");
let mongoUrl="mongodb://127.0.0.1:27017/wanderlust";

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

let db=async ()=>{
    await listing.deleteMany({})
    let newData=dataInit.map(data=>({ ...data, owner:'6656fcac4c2e77f35ea7f201'}))
    await listing.insertMany(newData)
    console.log("suc")
}
db();

console.log("",dataInit.map(data=>({ ...data, owner:"6656fcac4c2e77f35ea7f201" })) )
