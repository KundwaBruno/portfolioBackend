import express from 'express'
import mongoose from '../database/db.js'
import user from '../models/users.js'
import joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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
    if(userExists) return res.status(400).send('User does already exists');

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

    //Checking for email availability
    const userInfo = await user.findOne({email : req.body.email});
    if(!userInfo) return res.status(400).send({message : 'Invalid Email'});

    //Checking for password availability
    const pass = await bcrypt.compare(req.body.password , userInfo.password);
    if(!pass) return res.status(400).send({message : 'Invalid Password'});

    const token = jwt.sign({firstname : userInfo.firstname} , process.env.TOKEN_SECRET );

    res.cookie('auth-token' , token , {httpOnly : true});
    res.header('auth-token' , token).send({message : "Logged In" , token : token});

})

export default router;