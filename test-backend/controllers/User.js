const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const validate = require('../helpers/validate');
const User = require('../models/User');

const register = (req, res) => {

    let params = req.body;

    if (!params.name || !params.email || !params.password || !params.nick) {
        return res.status(400).json({
            status: "error",
            message: "Incomplete data"
        });
    }

    try {
        validate(params);   
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Validacion no superada"
        });
    }

    User.find({
        $or: [
            { email: params.email.toLowerCase() },
            { nick: params.nick.toLowerCase() }

        ]
    }).exec()
        .then(async (users) => {
            if (users && users.length >= 1) {
                return res.status(200).json({
                    status: "success",
                    message: "User already exists"
                });
            }

            const hash = await bcrypt.hash(params.password, 10);
            params.password = hash;

            let user_new = new User(params);

            user_new.save()
                .then((userStored) => {
                    return res.status(200).json({
                        status: "success",
                        message: "Successfully registered user",
                        user: {
                            id: userStored._id,
                            nick: userStored.nick,
                            name: userStored.name,
                            surname: userStored.surname,
                            created_at: userStored.created_at
                        }
                    });
                })
                .catch((error) => {
                    return res.status(500).send({
                        status: "error",
                        message: "Error saving user"
                    })
                });

        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                message: "Error in the query"
            })
        })
}


const login = (req, res) => {

    let params = req.body;

    if (!params.email || !params.password) {
        return res.status(400).json({
            status: "error",
            message: "Incomplete data"
        })
    }

    User.findOne({ email: params.email })
        .then((user) => {

            const verify = bcrypt.compareSync(params.password, user.password);

            if (!verify) {
                return res.status(400).json({
                    status: "error",
                    message: "Incorrect credentials"
                })
            }

            const token = jwt.createToken(user);

            return res.status(200).json({
                status: "success",
                message: "You have successfully logged in",
                user: {
                    id: user._id,
                    name: user.name,
                    nick: user.nick,
                    email: user.email
                },
                token
            });
        })
        .catch((error) => {
            return res.status(404).json({
                status: "error",
                message: "Error user not found"
            });
        })

}

const profile = (req, res) => {

    const id = req.params.id;

    User.findOne({ _id: id })
        .select({ password: 0, role: 0 })
        .then(async(userProfile) => {

            return res.status(200).json({
                status: "success",
                user: userProfile
            });
        })
        .catch((error) => {
            return res.status(404).json({
                status: "error",
                message: "Error user not found"
            });
        })

}

module.exports = {
    login,
    register,
    profile
}