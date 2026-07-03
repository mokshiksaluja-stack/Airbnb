const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../modals/listing");
const mongo_url="mongodb://localhost:27017/wanderlust";

let mongo =async ()=>{
    await mongoose.connect(mongo_url)
}

const initDB=async()=>{
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data)
   console.log("data was initialized");
}

mongo().then(()=>{
    console.log("connected to DB")
    return initDB();
}).catch((err)=>{
    console.log(err);
})