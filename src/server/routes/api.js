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
MongoClient.connect(connString, { useNewUrlParser: true , useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err);
    db = database.db('fweb_app');
})

router.route('/users').get(function (req, res) {
    db.collection('users').find().toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

router.route('/locations').get(function (req, res) {
    db.collection('game_qna').find().toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

router.route('/createUser').post(function (req, res) {
    db.collection('users').insertOne(req.body, function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

router.route('/findUserByUsername/:username').get(function (req, res) {
    db.collection('users').find({ username: req.params.username }).toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

router.route('/findUserByID/:id').get(function (req, res) {
    db.collection('users').find({ _id: ObjectID(req.params.id) }).toArray(function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
})

router.route('/deleteUser/:id').delete(function (req, res) {
    db.collection('users').deleteOne({ _id: ObjectID(req.params.id) }, function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
});

router.route('/updateUser/:id').put(function (req, res) {
    console.log(req.body);
    db.collection('users').updateOne({ _id: ObjectID(req.params.id) }, { $set: { username: req.body.username, password: req.body.password } }, function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
});

router.route('/updateUserScore/:id').put(function (req, res) {
    db.collection('users').updateOne({ _id: ObjectID(req.params.id) }, { $set: { score: req.body.score } }, function (err, results) {
        if (err) return console.log(err);
        res.send(results);
    })
});

module.exports = router;