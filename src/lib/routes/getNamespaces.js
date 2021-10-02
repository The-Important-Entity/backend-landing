module.exports = async function(req, res) {
    const organization = res.locals.user;
    const org_name = organization.organization;
    const orgs = await this.requester.getOrganization(org_name);
    if (orgs.length == 0) {
        res.status(500).send({"error": "internal server error"});
        return;
    }
    const org_id = orgs[0].id;
    const namespaces = await this.requester.getNamespaces(org_id);
    res.status(200).send(namespaces);
}