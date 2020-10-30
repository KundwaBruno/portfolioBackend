import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default function  ( req,res,next ) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({message : 'Access Denied'});

    try{
        const verified = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).send(err);
    }

} 