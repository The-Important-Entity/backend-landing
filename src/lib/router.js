'use strict';
const express = require("express");
const login = require("./routes/login");
const Requester = require("./requester");

class Router {
    constructor(config) {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
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

        // this.app.get("/security_groups", [
        //     this.auth.bind(this),
        //     this.getSecurityGroups.bind(this)
        // ]);

        this.app.post("/api/login", login.bind(this));
        this.app.get("/*", this.getFrontend.bind(this));

        this.test_appid = new RegExp('^[A-Z0-9]{50,}$')
    }

    getFrontend(req, res) {

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
            this.dbconn.close();
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = Router;