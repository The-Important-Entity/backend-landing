module.exports = async function(req, res) {
    const organization = req.locals.user;
    console.log(organization);
    res.send("Working")
}