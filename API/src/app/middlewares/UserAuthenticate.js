const jwt = require('jsonwebtoken');

const { authSecret } = require('../../.env');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ "error": "no token provided" });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ "error": "token error" });

    const [scheme, token] = parts;
    // /^...$^ -> regex
    if (! /^Bearer$/i.test(scheme))
        return res.status(401).send({ "error": "token malformatted" });

    jwt.verify(token, authSecret, (err, decode) => {
        if (err)
            return res.status(401).send({ "error": "invalid token" });
        
        req.userId = decode.id;
        return next();
    })
}