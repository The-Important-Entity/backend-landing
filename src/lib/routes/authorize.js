'use strict';

const authorize = async function(token) {
    const response = await this.requester.authorize(token);

    return response;
}

module.exports = authorize;