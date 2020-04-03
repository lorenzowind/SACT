const Sequelize = require('sequelize');

const { Criterion } = require('../models');

module.exports = {
    index(req, res) {
        Criterion.findAll()
            .then(criteria => res.json(criteria))
            .catch(err => res.status(500).send({ "error": err }));
    },

    store(req, res) {
        const criterion = { ...req.body };

        Criterion.create(criterion)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send({ "error": err }));

    },

    show(req, res) {
        Criterion.findOne({
            where: {
                id: req.params.id
            }
        }).then(criterion => res.json(criterion))
            .catch(err => res.status(500).send({ "error": err }));
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            const { ...data } = req.body;

            criterion = await Criterion.findOne({
                where: {
                    id
                }
            })
            
            criterion.update(data);

            return res.status(200).send(criterion);

        } catch (err) {
            return res.status(500).send({ "error": err });
        }
    },

    delete(req, res) {
        const { id } = req.params;

        Criterion.destroy({
            where: {
                id
            }
        }).then(_ => res.status(204).send())
          .catch(err => res.status(500).send({ "error": err }));
    }
}