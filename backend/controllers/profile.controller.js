const db = require("../models");
const Profile = db.profile;
const Op = db.Sequelize.Op;

// Create and Save a new Profile
exports.create = (req, res) => {
    // Validate request
    console.log(req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Profile
    const profile = {
        userId: req.body.userId,
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        filename: req.file ? req.file.filename : "",
    };

    // Save Profile in the database
    Profile.create(profile)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Profile."
            });
        });
};

// Retrieve all Profile from the database.
exports.findAll = (req, res) => {
    Profile.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving profiles."
            });
        });
};

// Retrieve an user profile from the database.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Profile.findAll({ where: { userId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving profiles."
            });
        });
};

// Find a single Profile with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Profile.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Profile with id=" + id
            });
        });
};

// Update a Profile by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    console.log('file: ',req.file)
    console.log('idddddd:',req.body)

    const profile = {
        userId: req.body.userId,
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        phone: req.body.phone,
        filename: req.file ? req.file.filename : "",
    };

    Profile.update(profile, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Profile was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Profile with id=" + id
            });
        });
};

// Delete a Profile with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Profile.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Profile was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Profile with id=" + id
            });
        });
};