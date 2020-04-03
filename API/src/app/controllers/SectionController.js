const Sequelize = require('sequelize');

const { Section, Criterion } = require('../models');

module.exports = {
    index(req, res) {
        Section.findAll({
            include: [
                {
                    model: Criterion,
                    as: 'criteria',
                    through: { attributes: [] }
                }
            ]
        })
            .then(sections => res.json(sections))
            .catch(err => res.status(500).send({ "error": err }));
    },
    async store(req, res) {
        try {
            const { criteria, ...data } = req.body;

            const section = await Section.create(data);

            if (criteria && criteria.length > 0) {
                section.setCriteria(criteria);
            }

            return res.status(200).send({ section });

        } catch (err) {
            return res.status(500).send({ "error": err });
        }

    },
    show(req, res) {
        Section.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Criterion,
                    as: 'criteria',
                    through: { attributes: [] }
                }
            ]
        })
            .then(section => res.json(section))
            .catch(err => res.status(500).send({ "error": err }));
    },
    async update(req, res) {

        const { id } = req.params;

        try {
            const { criteria, ...data } = req.body;

            section = await Section.findOne({
                where: {
                    id
                }
            })
            
            section.update(data);

            if (criteria && criteria.length > 0) {
                section.setCriteria(criteria);
            }

            return res.status(204).send();

        } catch (err) {
            return res.status(500).send({ "error": err });
        }

    },
    delete(req, res) {
        const { id } = req.params.id;

        Section.destroy({
            where: { id }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send({ "error": err }));
    }
}