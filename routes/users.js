import express from 'express'
import mongoose from '../database/db.js'
import user from '../models/users.js'
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import firebase from 'firebase';

dotenv.config();

//User authentication schema
const authSchema = {
    firstname : joi.string().min(3).required(),
    secondname : joi.string().min(3).required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required()
}


const router = express.Router();

router.get('/' , (req ,res) => {
    user.find((err,foundUsers) => {
        if(err){
            console.log(err);
        }else{
            res.send(foundUsers);
        }
    })
});

router.post('/' , async (req,res) => {
    //Validating user input before saving into the database using joi
    // const validation = joi.validate(req.body , authSchema);
    // res.send(validation);

    //Checking if user does exists
    const userExists = await user.findOne({email : req.body.email});
    if(userExists) return res.status(400).send({message:'User does already exists'});

    //Encrypting The password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password , salt);

    //Creating a new user
    const newUser = new user({
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        email: req.body.email,
        password: encryptedPassword
    });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }

    
})

//    Login Authentication

router.post('/login' , async (req,res) => {

    let email = re.body.email;
    let password = req.body.password;

    firebase.auth().signInWithEmailAndPassword( email , password ).catch((err)=>{
        let errorCode = error.code;
        res.send(errorCode);
    });

})

export default router;

//Checking user status route

router.get('/status' , async (req,res)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            res.send({message : `User ${user.email} is signed in`})
        } else {
            res.send({message : 'No user signed in'})
        }
    });
})