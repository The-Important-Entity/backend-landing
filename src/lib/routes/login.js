'use strict';

const login = async function(req, res) {
    const response = await this.requester.login(req.body.username, req.body.password);
    if (response.error) {
        res.status(400).send("Unauthorized");
        return;
    }

    res.cookie('jwt', response.token, this.loginCookieOptions);
}

module.exports = login;