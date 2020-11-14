import mongoose from 'mongoose';
import express from 'express';

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
    likes: [],
    comments: []
});

export default mongoose.model("article", articleSchema);