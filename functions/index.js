const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require('cors');
var app = express();
app.use(cors({
    origin: ["https://niawjunior.github.io/bxWs.io","http://127.0.0.1:8080"]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.status(200).send('ok')
})

app.get('/buy', function(req, res) {
    var dataArr = []
    axios.get("https://bx.in.th/api/orderbook/?pairing=1").then(function(data) {
        data.data.bids.map(function(item) {
            dataArr.push({
                rate: item[0],
                btc: item[1],
                thb:  Number(item[0]) * Number(item[1])
            })
        })
        res.status(200).send(JSON.stringify(dataArr))
    }).catch(function() {
        res.status(404).send('error')
    })
})

app.get('/sell', function(req, res) {
    var dataArr = []
    axios.get("https://bx.in.th/api/orderbook/?pairing=1").then(function(data) {
        data.data.asks.map(function(item) {
            dataArr.push({
                rate: item[0],
                btc: item[1],
                thb:  Number(item[0]) * Number(item[1])
            })
        })
        res.status(200).send(JSON.stringify(dataArr))
        // res.status(200).send(data)
    }).catch(function() {
        res.status(404).send('error')
    })
})

exports.order = functions.https.onRequest(app);
// app.listen(3000, function() {
//     console.log('running..')
// });