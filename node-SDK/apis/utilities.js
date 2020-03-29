'use strict';
const invoke = require('../blockchain/invokeNetwork');
const query = require('../blockchain/queryNetwork');

module.exports = {
    submitlocation: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
            console.log(response);
            if (response.status == 200) {
                _response = {
                    status: response.status,
                    result: "1"
                };
            } else {
                _response = {
                    status: response.status,
                    result: "0"
                };
            }
        }
        return _response;
    },

    police: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
            console.log(response);
            if (response.status == 200) {
                _response = {
                    status: response.status,
                    result: "2"
                };
            } else {
                _response = {
                    status: response.status,
                    result: "0"
                };
            }
        }
        return _response;
    },

    synctime: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
            console.log(response);
            if (response.status === 200) {
                _response = {
                    status: response.status,
                    result: request.args[2]
                };
            } else {
                _response = {
                    status: response.status,
                    result: "0"
                };
            }
        }
        return _response;
    }
};
