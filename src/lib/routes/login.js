'use strict';

const login = async function(req, res) {
    const response = await this.requester.login(req.body.username, req.body.password);
    if (response.error) {
        res.status(400).send({"error": "Unauthorized"});
        return;
    }
    res.status(200).send({'jwt': response.token});
}

module.exports = login;