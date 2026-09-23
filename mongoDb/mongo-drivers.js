import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../env.js";
import { email } from "zod";

export const dbClient = new MongoClient(MONGODB_URI);


// The below code is with mooongoose so install and run it
/*import mongoose from 'mongoose';
//step 1 to to connect the mongoDb Server

try {
    await mongoose.connect('mongodb://127.0.0.1/mongoose_database');
    mongoose.set("debug", true);
}
catch(error){
    console.error(error);
    process.exit();
}

//step 2 creating Schema
const userSchema = mongoose.Schema({
  //name: String,
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 5 },
  createdAt: { type: Date, default: Date.now() }, // we can add validation in schema
  updatedAt: { type: Date, default :  Date.now()}
});

// here the first parameter is [ ] which will contains the methods for which we need to run this pre function so like here jab updateOne, updateMany, findOneAndUpdate ye function jab bhi call ho aage code tab vo execute hone se pehle ye pre m jo function pass kiya hai vo execute hoga 

userSchema.pre(["updateOne", "updateMany", "findOneAndUpdate"], 
    function(next){ // here we need to use this key word that's why we keep use normal function instead of fat arrow
    this.set({updateAt : Date.now()});
    next();
})


//step 3 Creating model
const users = await mongoose.model(user,userSchema); // this user is basically a collection name in DB and here in code it should always be singular and DB it will be plural.

const user.create({ name: "thapa", age: 31, email: 'thapa@technical.com'}); //this will create entry doc in the DB

await users.updateOne({ email: 'thapa@technical.com'}, {$set: {age: 31} }); // update this data but before this pre fucntion will be also run

await mongoose.connection.close();*/
