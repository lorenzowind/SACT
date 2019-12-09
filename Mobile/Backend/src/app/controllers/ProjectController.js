const { Project, Section, Criterion } = require("../models");
const Sequelize = require('sequelize');
const Operation = Sequelize.Op;


module.exports = {
    Index(req, res) {
        Project.findAll({
            include: [
                {
                    model: Section,
                    as: 'sections',
                    through: { attributes: [] },
                },
                {
                    model: Criterion,
                    as: 'criteria',
                    through: { attributes: [] },
                }
            ]
        })
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send({ "error": err }));
    },

    async store(req, res) {
        try {
            const { criteria, sections, ...data } = req.body;

            const project = await Project.create(data);

            if (sections && sections.length > 0) {
                project.setSections(sections);
            }

            if (criteria && criteria.length > 0) {
                project.setCriteria(criteria);
            }

            return res.status(200).send(project);
        } catch (error) {
            return res.status(500).send({ "error": err });
        }

    },

    delete(req, res) {
        const { id } = req.params;

        Project.destroy({
            where: {
                id
            }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));

    },

    async update(req, res) {
        const { id } = req.params;

        try {
            const { criteria, sections, ...data } = req.body;

            project = await Project.findOne({
                where: {
                    id
                }
            });

            project.update(data);

            if (sections && sections.length > 0) {
                project.setSections(sections);
            }

            if (criteria && criteria.length > 0) {
                project.setCriteria(criteria);
            }

            return res.status(200).send(project);

        } catch (err) {
            return res.status(500).send({ "error": err });
        }
    },

    show(req, res) {
        let checkId = false;
        const { id } = req.params;

        if (!isNaN(id)) checkId = true;

        if (checkId) {
            Project.findOne({
                where: { id },
                include: [
                    {
                        model: Section,
                        as: 'sections',
                        through: { attributes: [] }
                    },
                    {
                        model: Criterion,
                        as: 'criteria',
                        through: { attributes: [] },
                    }
                ]
            })
                .then(project => res.json(project))
                .catch(err => res.status(500).send(err));
        }
        else {
            Project.findAll({
                where: {
                    name: { [Operation.like]: `%${id}%` }
                },
                include: [
                    {
                        model: Section,
                        as: 'sections',
                        through: { attributes: [] }
                    },
                    {
                        model: Criterion,
                        as: 'criteria',
                        through: { attributes: [] },
                    }
                ]
            })
                .then(projects => res.json(projects))
                .catch(err => res.status(500).send(err));
        }
    }
}