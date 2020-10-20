import mongoose from 'mongoose';

// Adding connection to the database and creating a new one if not found

let options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect("mongodb+srv://Admin-KundwaBruno:kundwabruno@kbmclustor.k8hj9.mongodb.net/portfolioDB?retryWrites=true/",options).then(console.log("Database is running"));

// Creating a skeleton for a collection to relate to

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: [true , "Password not set!"]}
});

// Creating a collection in the database

const user = mongoose.model("user",userSchema);

// Adding content in the collection 

// const addUser = new user ({
//     name: "Kundwa Bruno",
//     email: "kundwabruno@gmail.com",
//     password: "test@123"
// });

// const usertwo = new user({
//     name:"testing",
//     email:"test@gmail.com",
//     password:"testing"
// });

// Closing the connection

//mongoose.connection.close( function (err) { console.log("Connection closed");});

// usertwo.save(function (err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("User saved");
//     }});
    




//addUser.save();

// Deleting records

//user.deleteOne({what-to-delete}, callback function{});
// updating records
//user.updateOne({what-to-update: {what-to-update-to}}, callback function)