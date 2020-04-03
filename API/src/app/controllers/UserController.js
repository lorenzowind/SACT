const { User, Project } = require('../models');
const Sequelize = require('sequelize');
const Operation = Sequelize.Op;

module.exports = {

    Index(req, res) {
        User.findAll({
            include: [
                {
                    model: Project,
                    as: 'projects',
                    through: { attributes: [] }
                }
            ]
        })
            .then(users => res.json(users))
            .catch(err => res.status(500).send({ "error": err }));
    },

    async store(req, res) {
        try {
            const { projects, ...data } = req.body;

            const user = await User.create(data);

            if (projects && projects.length > 0) {
                user.setProjects(projects);
            }

            return res.status(200).send({ user });

        } catch (err) {
            return res.status(500).send({ "error": err });
        }
    },

    show(req, res) {
        User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Project,
                    as: 'projects',
                    through: { attributes: [] }
                }
            ]
        })
            .then(user => res.json(user))
            .catch(err => res.status(500).send({ "error": err }));
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            const { projects, ...data } = req.body;

            user = await User.findOne({
                where: {
                    id
                }
            })

            user.update(data);

            if (projects && projects.length > 0) {
                user.setProjects(projects);
            }
            return res.status(204).send();

        } catch (err) {
            return res.status(500).send({ "error": err });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        User.destroy({
            where: { id }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
    }



}