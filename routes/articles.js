import express from 'express'
import mongoose from '../database/db.js'
import article from '../models/articles.js'
const router = express.Router();
let date = new Date();

router.get("/", (req, res) => {
    article.find((err, foundArticles) => {
        res.send(foundArticles);
    })
});
// Getting all the articles
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
            res.send("Article Added successfully");
        }
    })
})
// Getting a specific article
router.get('/:articleID' , (req,res) => {
    article.findOne({_id: req.params.articleID} , (err,article) =>{
        if(err){
            console.log(err);
        }else if (!article){
            res.send("No such article");
        }else{
            res.send(article);
        }
    })
});

router.delete("/:articleID", (req, res) => {
        article.deleteOne({
            _id: req.params.articleID
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Article deleted successfully");
            }
        })
    });


    router.patch("/:articleID", (req,res) => {
        article.updateOne({_id: req.params.articleID} , {$set: req.body} , (err) => {
            if(err){
                console.log(err);
            }else{
                res.send("Article updated successfully");
            }
        }
    )}
    );

export default router;