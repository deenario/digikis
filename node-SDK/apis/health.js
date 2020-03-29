'use strict';
const invoke = require('../blockchain/invokeNetwork');
const query = require('../blockchain/queryNetwork');

module.exports = {

    sensor: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
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

    submitbloodpressure: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
            if (response.status === 200) {
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

    submitox: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
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

    submitecg: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
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

    submitsport: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
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

    submitsleep: async function (request) {
        let _response = {};
        let response = await invoke.invokeCreate(request);
        if (response) {
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
        ;
    }

}
