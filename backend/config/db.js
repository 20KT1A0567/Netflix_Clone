import mongoose from "mongoose";
import {ENV_VARS} from "./envVars.js";

export const connectionDb = async ()=>{

    try{
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("Mongodb is connected "+conn.connection.host);
    }catch(error){
        console.log("Error connectiong in MONGO_URI : "+error.message);
        process.exit(1); //1 means connection was a error , 0 means connection is successful

        }
    

}