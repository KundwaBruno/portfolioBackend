import express from 'express'
import mongoose from 'mongoose'

const dbpass = process.env.DB_password;
const DB_PORT = process.env.PORT;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
// // Connection to the local database
// mongoose.connect('mongodb://localhost:27017/portfolioDB', options, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database is running");
//     }
// });

//Connecting to cloud Database
mongoose.connect("mongodb+srv://Admin-KundwaBruno:"+ dbpass +"@kbmclustor.k8hj9.mongodb.net/portfolioDB",options, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Database is running");
    }
});

export default mongoose;
