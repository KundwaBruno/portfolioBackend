import express from 'express'
import mongoose from '../database/db.js'
import user from '../models/users.js'
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

router.post('/' , (req,res) => {
    const newUser = new user({
        firstname: req.body.firstname,
        secondname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("User created successfully");
        }
    });
})

export default router;