'use strict';
const axios = require("axios");

class Requester {
    constructor(dbservice, auth){
        this.dbservice = dbservice;
        this.auth = auth;
    }

    async login (username, password) {
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

    async authorize (token) {
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

    async getOrganization(organization) {
        try {
            const response = await axios.get(this.dbservice + "/organization/" + organization);

            return response.data;
        }

        catch(err) {
            return [];
        }
    }
    async getSecurityGroups(org_id) {
        try {
            const response = await axios.get(this.dbservice + "/security_group/" + org_id.toString());

            return response.data;
        }

        catch(err) {
            return [];
        }
    }

    async getSecurityPerms(group_id) {
        try {
            const response = await axios.get(this.dbservice + "/security_perm/" + org_id.toString());

            return response.data;
        }

        catch(err) {
            return [];
        }
    }
}

module.exports = Requester;