import express from 'express'
import mongoose from 'mongoose'
import message from '../models/messages.js'

const router = express.Router();
let date = new Date();

// User sending a message
router.post('/' , (req,res) => {


    const newMessage = new message({
        date : date,
        name : req.body.name,
        email : req.body.email,
        message : req.body.message
    })

    newMessage.save().then(response => res.send({Message : "Message Sent !"})).catch ( (err)=> {
        res.send(err);
    });


});

//Getting all the messages
router.get('/' , (req,res) => {


   message.find( (err,messages) => {
       if(!err){
           res.send(messages);
       }else{
           res.send('Opps There was an error' + err);
       }
   } )



});

//Deleting a message
router.delete("/:messageID", (req, res) => {
    message.deleteOne({
        _id: req.params.messageID
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send({message : "Message deleted successfully"});
        }
    })
});

export default router;