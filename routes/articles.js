import express from 'express'
import mongoose from '../database/db.js'
import article from '../models/articles.js'
const router = express.Router();
let date = new Date();


// Getting all articles
router.get("/", (req, res) => {
    article.find((err, foundArticles) => {
        res.send(foundArticles);
    })
});


// Creating a new article
router.post('/', (req,res) => {
    const newArticle = new article({
        title: req.body.title,
        date: date,
        image: req.body.image,
        description: req.body.description
    });

    newArticle.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send(newArticle);
        }
    })
});


// Getting a specific article
router.get('/:articleID' , (req,res) => {
    article.findOne({_id: req.params.articleID} , (err,article) =>{
        if(err){
            console.log(err);
        }else if (!article){
            res.send({message :"No such article"});
        }else{
            res.send(article);
        }
    })
});

// Deleting a specific article
router.delete("/:articleID", (req, res) => {
        article.deleteOne({
            _id: req.params.articleID
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send({message : "Article deleted successfully"});
            }
        })
    });


// Updating an article
router.patch("/:articleID", (req,res) => {
        article.updateOne({_id: req.params.articleID} , {$set: req.body} , (err) => {
            if(err){
                console.log(err);
            }else{
                res.send({message : "Article updated successfully"});
            }
        }
    )}
    );

export default router;