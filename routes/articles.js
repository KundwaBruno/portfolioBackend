import express from 'express'
import article from '../models/articles.js'

const router = express.Router();
const today = new Date().toString();

// Getting all articles
router.get("/", (req, res) => {
    article.find((err, foundArticles) => {
        res.send(foundArticles);
    })
});


// Creating a new article
router.post('/',(req,res) => {
    const newArticle = new article({
        title: req.body.title,
        date: today,
        image: req.body.image,
        description: req.body.description,
        likes : [] ,
        comments : []
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

// Deleting all articles
router.delete('/' , (req,res)=>{
    article.deleteMany((err)=>{
        if(err){
            res.send(error);
        }else{
            res.send('All articles deleted successfully!');
        }
    })
})    


// Updating an article
router.patch("/:articleID", (req,res) => {
        article.findOneAndUpdate({_id: req.params.articleID} , req.body , (err) => {
            if(err){
                console.log(err);
            }else{
                res.send({message : "Article updated successfully"});
            }
        }
    )}
    );


    //Adding a comment
    router.post("/:articleID/comment" , (req,res) => {
        article.updateOne({_id: req.params.articleID } , {$push: {comments : {username : req.body.name , comment : req.body.body , date : today}}} , (err) => {
            if(err){
                res.send(err);
            }else{
                res.send({message : "Comment Added successfully"});
            }
        });
    })

   //Adding a like
   router.post("/:articleID/likes" , async (req,res) => {
    const userLiked = await article.find({"likes.username" : req.body.username } );

    if(userLiked.length === 0){
        article.updateOne({_id:req.params.articleID} , { $push : {likes : { username : req.body.username } } } , (err) => {
            if(err){
                res.send(err);
            }
            res.send({message : "Liked"});
        })
    }else{
        article.updateOne({_id:req.params.articleID} , { $pull : {likes : { username : req.body.username } } } , (err) => {
            if(err){
                res.send(err);
            }
            res.send({message : "Disliked"});
        })
       
    }
   });
   

   //Getting All likes
   router.get("/:articleID/likes" , (req,res) => {
       article.findOne({_id : req.params.articleID} , (err,article) => {
           if(!err) return res.send(article.likes);
       });
   });

   //Checking like Availability
   router.post("/:articleID/likes/status" , async (req,res) => {
      const userLiked = await article.find({"likes.username" : req.body.username } );
      if(userLiked.length === 0){
          res.send({liked : false});
      }else{
          res.send({liked : true});
      }
   })

export default router;