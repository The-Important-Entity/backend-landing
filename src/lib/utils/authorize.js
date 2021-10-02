module.exports = async function(req, res, next) {
    const token = req.cookies['jwt'];
    if (!token) {
        res.status(400).send({"error": "Unauthorized"});
        return;
    }
    const response = await this.requester.authorize(token);
    if (response.error == "Unauthorized") {
        res.status(400).send({"error": "Unauthorized"});
        return;
    }

    res.locals.user = response;
    next();
}