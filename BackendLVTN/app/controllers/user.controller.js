const UserService = require("../services/user.service");
const ApiError = require("../api-error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username can not be empty"));
    }
    if (!req.body?.email) {
        return next(new ApiError(400, "Email can not be empty"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password can not be empty"));
    }

    try {
        const db = UserService.getUserInstance();
        const result = await db.registerNewUser([
            req.body.username,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8),
            req.body.gender,
            req.body.birthday,
            req.body.phone,
        ]);
        const user = await db.selectByEmail(req.body.email);
        let token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 86400 }// expires in 24 hours
        )
        return res.send({
            auth: true,
            token: token,
            user: user
        }); //post
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the new user")
        )
    }
};

exports.registerAdmin = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username can not be empty"));
    }
    if (!req.body?.email) {
        return next(new ApiError(400, "Email can not be empty"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password can not be empty"));
    }

    try {
        const db = UserService.getUserInstance();
        const result = await db.registerAdmin([
            req.body.username,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8),
            req.body.gender,
            req.body.birthday,
            req.body.phone,
            1
        ]);
        const user = await db.selectByEmail(req.body.email);
        let token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 86400 }// expires in 24 hours
        )
        return res.send({
            auth: true,
            token: token,
            user: user
        }); //post
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the new user")
        )
    }
};

exports.login = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "Username can not be empty"));
    }
    if (!req.body?.email) {
        return next(new ApiError(400, "Email can not be empty"));
    }
    if (!req.body?.password) {
        return next(new ApiError(400, "Password can not be empty"));
    }

    try {
        const db = UserService.getUserInstance();
        const user = await db.selectByEmail(req.body.email);
        if (!user) return next(new ApiError(404, "User not found"));
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid)
            return res.status(404).send({
                auth: false,
                token: null
            });
        let token = jwt.sign(
            { id: user.id },
            config.secret,
            { expiresIn: 86400 }// expires in 24 hours
        )
        return res.send({
            auth: true,
            token: token,
            user: user
        }); //post
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while login user")
        )
    }

};