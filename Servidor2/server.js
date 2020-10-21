const { MongoClient } = require('mongodb')
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json({ limit: '5mb', extended: true }));


const uri = 'mongodb://ec2-52-23-167-65.compute-1.amazonaws.com:27017';
const client = new MongoClient(uri);

app.post('/', async (req, res) => {
    const newUser = {
        name: req.body.name,
        nickname: req.body.nickname,
        first: req.body.first,
        second: 'Server 2'
    };
    let result = { 'message': 'ok' };
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('users')
        collection.insertOne(newUser);
    } catch (err) {
        console.log(err);
        result = { 'message': 'failed' };
    } finally {
        res.json(result);
    }
});

app.listen(5000);