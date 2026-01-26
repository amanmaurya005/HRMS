import mongoose from "mongoose";
import "dotenv/config"

async function connectToDB(){
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected")
}
catch(error){
    console.log("connecting to DB error",error)
}
}

export default connectToDB