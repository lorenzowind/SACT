const { ProjectCriteria } = require("../models");
const Sequelize = require('sequelize');

module.exports = {
    index(req, res) {
        ProjectCriteria.findAll()
            .then(result => res.json(result))
            .catch(err => res.status(500).send({ "error": err }));
    },

    store(req, res) {
        const { rate } = req.body;
        const data = {
            CriterionId: req.params.criterionid,
            ProjectId: req.params.projectid,
            UserId: req.params.userid,
            rate
        }
        /*
            Criterio
        */
        ProjectCriteria.create(data)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send({ "error": err }));

    },

    update(req, res) {
        const { rate } = req.body;

        ProjectCriteria.findOne({
            where: {
                CriterionId: req.params.criterionid,
                ProjectId: req.params.projectid,
                UserId: req.params.userid
            }
        }).then(result => {
            result.update({ rate });
            res.status(204).send();
        }).catch(err => res.status(500).send({ "error": err }));

    },

    show(req, res) {
        ProjectCriteria.findOne({
            where: {
                CriterionId: req.params.criterionid,
                ProjectId: req.params.projectid,
                UserId: req.params.userid
            }
        }).then(result => {
            res.json(result)
        }).catch(err => res.status(500).send({ "error": err }));
    },

    delete(req, res) {
        ProjectCriteria.destroy({
            where: {
                CriterionId: req.params.criterionid,
                ProjectId: req.params.projectid,
                UserId: req.params.userid
            }
        })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send({ "error": err }));
    },

    indexByUser(req, res) {
        ProjectCriteria.findAll({
            where: {
                UserId: req.params.userid
            }
        })
            .then(result => res.json(result))
            .catch(err => res.status(500).send({ "error": err }));
    },

    showByUser(req, res) {
        ProjectCriteria.findOne({
            where: {
                UserId: req.params.userid,
                ProjectId: req.params.projectid
            }
        })
            .then(result => res.json(result))
            .catch(err => res.status(500).send({ "error": err }));
    }

}