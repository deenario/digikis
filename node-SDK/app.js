'use strict';

//get libraries
const express = require('express');
var queue = require('express-queue');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const query = require('./blockchain/queryNetwork');

//create express web-app
const app = express();
const health = require('./apis/health');
const utilities = require('./apis/utilities');
var _time = "T00:00:00Z";

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
    port = process.env.PORT;
}
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Using queue middleware
app.use(queue({activeLimit: 30, queuedLimit: -1}));

//run app on port
app.listen(port, function () {
    console.log('app running on port: %d', port);
});

//-------------------------------------------------------------
//----------------------  GET API'S    -----------------------
//-------------------------------------------------------------

app.get('/devices/receivedata', async function (req, res) {

    let ts = Math.floor(new Date() / 1000);
    let id = (ts + (Math.floor(Math.random() * 1000) + 1)).toString();

    if (req.query.action === 'addAir') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addAir',
            args: [
                id,
                req.query.deviceid,
                req.query.co,
                req.query.ozone,
                req.query.lpg,
                req.query.smoke,
                req.query.oxides,
                req.query.temperature,
                req.query.humidity,
                new Date()
            ]
        };

        let response = await utilities.synctime(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    }

    else if (req.query.action === 'addParking') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addParking',
            args: [
                id,
                req.query.deviceid,
                req.query.place,
                req.query.freeSlot,
                req.query.occupiedSlot,
                new Date()
            ]
        };
        let response = await utilities.synctime(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    }

    else if (req.query.action === 'addAccident') {
      var request = {
        chaincodeId: 'digikis',
        fcn: 'addAccident',
        args: [
            id,
            req.query.deviceid,
            req.query.muscle,
            req.query.accelerometer,
            req.query.pulse,
            new Date()
        ]
      };
      let response = await utilities.synctime(request);
      if (response) {
        console.log(response);
        res.status(response.status).send(response.result);
      }
    }

    else if (req.query.action === 'synctime') {
        let currentdate = new Date();
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addBootdevice',
            args: [
                id,
                req.query.deviceid,
                new Date()
            ]
        };
        console.log(request);
        let response = await utilities.synctime(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }

    } else if (req.query.action === 'sensor') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addHeartrate',
            args: [
                id,
                req.query.deviceid,
                req.query.heart ? req.query.heart : ""
            ]
        };
        console.log(request);
        let response = await health.sensor(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action === 'submitbloodpressure') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addBloodpressure',
            args: [
                id,
                req.query.deviceid,
                req.query.systolic ? req.query.systolic : "",
                req.query.diastolic ? req.query.diastolic : "",
                req.query.heartrate ? req.query.heartrate : ""
            ]
        };
        console.log(request);
        let response = await health.submitbloodpressure(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'submitox') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addBloodoxygen',
            args: [
                id,
                req.query.deviceid,
                req.query.ox ? req.query.ox : ""
            ]
        };
        console.log(request);
        let response = await health.submitox(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'submitecg') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addECG',
            args: [
                id,
                req.query.deviceid,
                req.query.heartrate ? req.query.heartrate : ""
            ]
        };
        console.log(request);
        let response = await health.submitecg(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'submitsport') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addSportdata',
            args: [
                id,
                req.query.deviceid,
                req.query.sportstep ? req.query.sportstep : "",
                req.query.sportdistance ? req.query.sportdistance : "",
                req.query.sportcalorie ? req.query.sportcalorie : "",
                req.query.sporttime ? req.query.sporttime : ""
            ]
        };
        console.log(request);
        let response = await health.submitsport(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'submitsleep') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addSleepdata',
            args: [
                id,
                req.query.deviceid,
                req.query.sleeptotal ? req.query.sleeptotal : "",
                req.query.sleeplow ? req.query.sleeplow : "",
                req.query.sleepdeep ? req.query.sleepdeep : ""
            ]
        };
        console.log(request);
        let response = await health.submitsleep(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'submitlocation') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addGeographicposition',
            args: [
                id,
                req.query.deviceid,
                req.query.longitude ? req.query.longitude : "",
                req.query.latitude ? req.query.latitude : "",
                req.query.lbsinfo ? req.query.lbsinfo : "",
                req.query.wifi ? req.query.wifi : "",
                req.query.mt ? req.query.mt : ""
            ]
        };
        console.log(request);
        let response = await utilities.submitlocation(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else if (req.query.action == 'police') {
        var request = {
            chaincodeId: 'digikis',
            fcn: 'addAlarm',
            args: [
                id,
                req.query.deviceid,
                req.query.lbsinfo ? req.query.lbsinfo : "",
                req.query.latitude ? req.query.latitude : "",
                req.query.longitude ? req.query.longitude : "",
                req.query.wifi ? req.query.wifi : "",
                req.query.mt ? req.query.mt : "",
                req.query.type ? req.query.type : ""
            ]
        };
        console.log(request.args);
        let response = await utilities.police(request);
        if (response) {
            console.log(response);
            res.status(response.status).send(response.result);
        }
    } else {
        res.status(500).send("Wrong Input");
    }

});


app.get('/api/sportdata', async function (req, res) {
    const request = {
        chaincodeId: 'digikis',
        fcn: 'querySportdata',
        args: [
            req.query.deviceid
        ]
    };
    let response = await query.invokeQuery(request)
    if (response) {
        if (response.status == 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({message: response.message});
    }
});

app.get('/api/sleepdata', async function (req, res) {
    const request = {
        chaincodeId: 'digikis',
        fcn: 'querySleepdata',
        args: [
            req.query.deviceid
        ]
    };
    let response = await query.invokeQuery(request);
    if (response) {
        if (response.status === 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({message: response.message});
    }
});

app.get('/api/queryair', async function (req, res) {
    const request = {
        chaincodeId: 'digikis',
        fcn: 'queryAir',
        args: [
            req.query.deviceid
        ]
    };
    let response = await query.invokeQuery(request);
    if (response) {
        if (response.status === 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({message: response.message});
    }
});

app.get('/api/queryparking', async function (req, res) {
    const request = {
        chaincodeId: 'digikis',
        fcn: 'queryParking',
        args: [
            req.query.deviceid
        ]
    };
    let response = await query.invokeQuery(request);
    if (response) {
        if (response.status === 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({message: response.message});
    }
});

app.get('/api/queryaccident', async function (req, res) {
    const request = {
        chaincodeId: 'digikis',
        fcn: 'queryAccident',
        args: [
            req.query.deviceid
        ]
    };
    let response = await query.invokeQuery(request);
    if (response) {
        if (response.status === 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({message: response.message});
    }
});
