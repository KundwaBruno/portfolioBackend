import express  from 'express'
import comments from '../models/comments.js'
const router = express.Router();

const date = new Date();


//Create comments
router.post('/:articleID' , (req,res) => {
    const newComment = new comments({
        articleID : req.params.articleID,
        username : 'Person',
        body : req.body.body,
    })

    newComment.save().then(response => res.send(response)).catch(err => console.log(err))
});

//Get all comments
router.get('/' , (req,res) => {
    comments.find((err,articles) => {
        if(err){
            console.log(err);
        }else{
            res.send(articles);
        }
    })
})

export default router;