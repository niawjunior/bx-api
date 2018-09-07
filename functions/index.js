const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require('cors');
var app = express();
app.use(cors({
    origin: "https://github.com/niawjunior/bxWs.io"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function(req, res) {
    res.status(200).send('ok')
})

function currencyFormat(curr) {
    return parseFloat(curr).toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });
}

app.get('/buy', function(req, res) {
    var dataArr = []
    axios.get("https://bx.in.th/api/orderbook/?pairing=1").then(function(data) {
        data.data.bids.map(function(item,key) {
            dataArr.push({
                rate: item[0],
                btc: item[1],
                thb:  currencyFormat(Number(item[0]) * Number(item[1]))
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
        data.data.asks.map(function(item,key) {
            dataArr.push({
                rate: item[0],
                btc: item[1],
                thb:  currencyFormat(Number(item[0]) * Number(item[1]))
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