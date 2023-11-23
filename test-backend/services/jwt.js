const jwt = require("jwt-simple");
const moment = require("moment");

const key = "53CR3T_K3Y_T35T";

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix()
    };

    return jwt.encode(payload, key)
}

module.exports = {
    createToken,
    key
}
