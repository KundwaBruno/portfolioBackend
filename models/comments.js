import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    articleID : { type : String , required : true},
    username : String,
    body : { type : String , required : true}
})

export default mongoose.model('comment' , commentSchema);