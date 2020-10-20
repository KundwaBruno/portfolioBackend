import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import multer from 'multer';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import path from 'path';
import {EDESTADDRREQ} from 'constants';
import { ppid, title } from 'process';
import JSDOM from 'jsdom';
import moment from 'moment';
import cors from 'cors';



moment().format();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer();
let date = new Date();
// let opt = {
//     weekday: "short",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   };
// date = date.toLocaleDateString("en-US",opt);


const app = express();
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers' , 'Content-Type');
    next();
})
// app.use(cors());
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/../public')));

const dbpass = process.env.DB_password;
const DB_PORT = process.env.PORT;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
//Connection to the cloud database

mongoose.connect("mongodb+srv://Admin-KundwaBruno:" + dbpass + "@kbmclustor.k8hj9.mongodb.net/portfolioDB",options, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Database is running");
    }
});

// Connection to the local database
// mongoose.connect('mongodb://localhost:27017/portfolioDB', options, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database is running");
//     }
// });

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
    }

});
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
});

const article = mongoose.model("article", articleSchema);

const user = mongoose.model("user", userSchema);

                // The home route
app.route("/")
    .get((req, res) => {
        // res.sendFile(path.resolve(__dirname + '/../index.html'));
        res.send({message : "Server is working properly"});
    });

                // The signup route
app.route("/signup")
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname + "/../signup.html"));
    })
    .post((req,res) => {
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
    });
                //Blog route
    app.route("/blog")
    .get((req,res) => {
        article.find({} , (err , foundArticle) => {
                res.render(path.resolve(__dirname + "/../views/blog.ejs") , {foundArticle : foundArticle , moment: moment});
        });
    });

    // .post((req,res) => {
    //     article.find((err , foundArticle) => {
    //         foundArticle.forEach(element => {
    //             article.insertOne()
    //         });
    //     })
    //     });

                //Blogdashboard route
    app.route("/blogdashboard").get((req,res) => {
        res.sendFile(path.resolve(__dirname + "/../blog/blogdashboard.html"));
    })
    .post((req,res) => {

    });

                //Article route
    app.route("/article").get((req,res) => {
        res.sendFile(path.resolve(__dirname + "/../blog/addarticle.html"));
        // Getting time stamp console.log();
    })
    .post((req,res) => {
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
    });

                //SignIn route
app.route("/signin")
    .get((req,res) => {
            res.sendFile(path.resolve(__dirname + "/../signin.html"));
    });
                // Users route
// app.route("/users").get((req, res) => {
//         user.find((err, usersFound) => {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send(usersFound);
//             }
//         });
//     })

//     .post((req, res) => {

//                 //Creating new user

//         const newUser = new user({
//             firstname: req.body.firstname,
//             secondname: req.body.secondname,
//             email: req.body.email,
//             password: req.body.password
//         });

//         newUser.save((err) => {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send("User created successfully");
//             }
//         });

//     })

                // Warning: This route deletes all users in the collection

    // .delete((req, res) => {
    //     user.deleteMany((err) => {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send("users deleted successfully")
    //         }
    //     })
    // });

                //Article route

app.get("/getArticles", (req, res) => {
    article.find((err, foundArticles) => {
        res.send(foundArticles);
    })
});

app.get("/getArticle/:articleID", (req, res) => {
    article.findOne({
        _id: req.params.articleID
    }, (err, foundArticle) => {
        if (!foundArticle) {
            res.send("No found articles related to that input");
        } else {
            res.send(foundArticle);
        }
    })
});

app.post("/createArticle", (req, res) => {
    const newArticle = new article({
        title: req.body.title,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        comments: req.body.comments
    });

    newArticle.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Article Added successfully");
        }
    })
});

app.delete("/deleteArticle/:articleID", (req, res) => {
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

                // Updating all articles

app.put("/updateArticle/:articleID", (req, res) => {
    article.updateOne({
        _id: req.params.articleID
    }, {
        title: req.body.title,
        description: req.body.description
    }, 
    {overwrite: true},
     (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Article updated successfully");
        }
    });
});


                // Updating a certain part of article


app.patch("/updateArticle/:articleID", (req,res) => {
    article.updateOne({_id: req.params.articleID} , {$set: req.body} , (err) => {
        if(err){
            console.log(err);
        }else{
            res.send("Article updated successfully");
        }
    }
)}
);



let PORT = process.env.PORT;
app.listen(PORT || 3000, console.log(`Server is running on port ${PORT}`));