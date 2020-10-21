const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = new express();
app.use(bodyParser.json({ limit: '5mb', extended: true }));

app.post('/', (req, res) => {
    const user = req.body;
    const newUser = JSON.stringify({
        name: user.name,
        nickname: user.nickname,
        first: 'Server 1'
    });
    
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(newUser)
        },
    }
    const request = http.request(options, (response) => {
        response.setEncoding('utf8');
        response.on('data', (d) => {
            res.json(JSON.parse(d.toString()));
        });
    });
    request.on('error', (error) => {
        res.status(500).json(JSON.parse(error.toString()));
    });
    request.write(newUser);
    request.end();
});

app.listen(3000);
