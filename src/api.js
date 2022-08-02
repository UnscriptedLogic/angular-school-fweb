const express = require('express');
const router =  express.Router();

const axios =  require('axios');
const API =  'https://jsonplaceholder.typicode.com';

connString = "mongodb+srv://test1:testone1@fwebcluster.hgmkq0y.mongodb.net/?retryWrites=true&w=majority";

router.get('/', (req, res) => {
    res.send("API works!");
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

var db;
MongoClient.connect(connString, { useNewUrlParser: true , useUnifiedTopology: true }, (err, db) => {
    if (err) return console.log(err);;
    db = database.db('miniprojectDB');
})

router.route('/posts').post(function (req, res) {
        db.collection('posts').insertOne(req.body, (err, results) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.send(results);
    });
});

module.exports = router;