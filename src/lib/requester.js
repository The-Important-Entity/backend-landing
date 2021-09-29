'use strict';
const axios = require("axios");

class Requester {
    constructor(dbservice, auth){
        this.dbservice = dbservice;
        this.auth = auth;
    }

    login (username, password) {
        try {
            const response = await axios.post(this.auth + "/login", {
                "username": username,
                "password": password
            });

            return response.data;
        }
        catch(err) {
            return {
                "error": "Unauthorized"
            };
        }
    }

    authorize (token) {
        try {
            const response = await axios.post(this.auth + "/token", {
                "token": token
            });

            return response.data;
        }

        catch(err) {
            return {
                "error": "Unauthorized"
            }
        }
    }
}

module.exports = Requester;