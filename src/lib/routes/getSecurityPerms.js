module.exports = async function(req, res) {
    const group_id = req.query.group_id;
    if (!group_id) {
        res.status(400).send({"error": "Missing group id"});
        return;
    }

    const perms = await this.requester.getSecurityPerms(group_id);
    res.status(200).send(perms);
}