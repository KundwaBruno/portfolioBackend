import mongoose from 'mongoose'
import express from 'express'

const messageSchema = new mongoose.Schema({
    date : {type : String} ,
    name : {type : String , required : true} ,
    email : {type : String , required : true} ,
    message : {type : String ,  required : true} 
})

export default mongoose.model('message' , messageSchema);