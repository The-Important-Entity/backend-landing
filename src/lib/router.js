'use strict';
const express = require("express");
const login = require("./routes/login");
const Requester = require("./requester");
const path = require("path");
const authorize = require("./utils/authorize");
const getSecurityGroups = require("./routes/getSecurityGroups");
const getSecurityPerms = require("./routes/getSecurityPerms");
const getNamespaces = require("./routes/getNamespaces");
const getAccessKeys = require("./routes/getAceessKeys");
const cookieParser = require('cookie-parser');

class Router {
    constructor(config) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        var cors = require('cors');
        this.app.use(cors());
        this.app.use(cookieParser());
        
        this.port = config.PORT;
        this.requester = new Requester(config.DB_SERVICE, config.AUTH_SERVICE);

        this.loginCookieOptions = {
            expires: new Date(
                Date.now() + 60*60*1000
            ),
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        }


        this.app.post("/login", login.bind(this));

        this.app.get('/security_groups', [
            authorize.bind(this),
            getSecurityGroups.bind(this)
        ]);
        this.app.get('/security_perms', [
            authorize.bind(this),
            getSecurityPerms.bind(this)
        ]);
        this.app.get('/namespaces', [
            authorize.bind(this),
            getNamespaces.bind(this)
        ]);
        this.app.get('/access_keys', [
            authorize.bind(this),
            getAccessKeys.bind(this)
        ]);

        this.test_appid = new RegExp('^[A-Z0-9]{50,}$')
    }
    start() {
        try {
            this.server = this.app.listen(this.port, function(){
                console.log("Backend Service listening on port " + this.port.toString());
            }.bind(this));
        }
        catch(err) {
            throw(err);
        }
    }

    stop(){
        try {
            this.server.close();
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = Router;