const db = require("../models");
const Profesional = db.profesional;
const Op = db.Sequelize.Op;

// Create and Save a new Profesional
exports.create = (req, res) => {
    // Validate request
    
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Profesional
    const profesional = {
        id: req.body.id,
        userId: req.body.userId,
        category: req.body.category,
        bio: req.body.bio,
        tecnologies: req.body.tecnologies,
        benefits: req.body.benefits,
        isCompany: req.body.isCompany,
    };

    // Save Profesional in the database
    Profesional.create(profesional)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Profesional."
            });
        });
};

// Retrieve all Profesional from the database.
exports.findAll = (req, res) => {
    Profesional.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Profesionals."
            });
        });
};

// Retrieve an user Profesional from the database.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Profesional.findAll({ where: { userId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Profesionals."
            });
        });
};

// Find a single Profesional with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Profesional.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Profesional with id=" + id
            });
        });
};

// Update a Profesional by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
console.log(req.params)
    Profesional.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Profesional was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Profesional with id=${id}. Maybe Profesional was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Profesional with id=" + id
            });
        });
};

// Delete a Profesional with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Profesional.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Profesional was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Profesional with id=${id}. Maybe Profesional was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Profesional with id=" + id
            });
        });
};