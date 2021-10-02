module.exports = async function(req, res) {
    const organization = res.locals.user;
    console.log(organization);
    res.send("Working")
}