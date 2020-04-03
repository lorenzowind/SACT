const Sequelize = require('sequelize');
const jwt = require('jwt-simple');

const { User } = require('../../models');
const { authSecret } = require('../../../.env');

module.exports = {

    async signIn(req, res) {

        if (!req.body.cpf) {
            return res.status(400).send('You need to insert your cpf');
        }

        const user = await User.findOne({
            where: {
                cpf: req.body.cpf
            }
        })

        if (!user) {
            return res.status(400).send('USER NOT FOUND');
        }

        const dateNow = Math.floor(Date.now() / 1000);
        //conteúdo do token a ser passado para gerar o mesmo
        const payload = {
            id: user.id,
            cpf: user.cpf,
            name: user.name,
            phone: user.phone,
            occupationArea: user.occupationArea,
            evaluatedPrjs: user.evaluatedPrjs,
            institution: user.institution,
            status: user.status,
            iat: dateNow,
            exp: dateNow + (60 * 60 * 24)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    },


    validateToken(req, res) {
        const userData = req.body || null;
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret);
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true);
                }
            }
        } catch (e) {
        }
        res.send(false);
    }
}