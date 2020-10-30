import express from 'express'
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    date: {
        type: String,
        default: new Date
    }

});

export default mongoose.model("user", userSchema);