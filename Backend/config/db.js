
import mongoose from "mongoose";

const db_Connection=async()=>{
try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database connected successfully");
}
catch(error){
    console.log("Database connection error:", error);
}
}
export default db_Connection;