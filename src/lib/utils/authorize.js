module.exports = async function(req, res, next) {
    const response = await this.requester.authorize(token);

    if (response.error = "Unauthorized") {
        res.status(400).send({"error": "Unauthorized"});
        return;
    }

    req.locals.user = response;
    next();
}