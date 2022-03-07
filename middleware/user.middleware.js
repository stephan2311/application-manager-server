const User = require("../models/User.model");
const Application = require("../models/Application.model");

function applicationAccess(applications) {
    if (applications) {
        req.user = user.find(user => user.id === userId)
        console.log(req.user)
    }
    next()
}

module.exports = {
    applicationAccess
} 