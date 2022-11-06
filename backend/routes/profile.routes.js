module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new Motorbikes
    router.post("/", auth.isAuthenticated, profiles.create);

    // Retrieve all Motorbikes
    router.get("/", auth.isAuthenticated, profiles.findAll);

    // Retrieve a single Motorbikes with id
    router.get("/:id", auth.isAuthenticated, profiles.findOne);

    // Retrieve all motors equals an id
    router.get("/user/:id", auth.isAuthenticated, profiles.findAllByUserId);

    // Update a Motorbikes with id
    router.put("/:id", auth.isAuthenticated, profiles.update);

    // Delete a Motorbikes with id
    router.delete("/:id", auth.isAuthenticated, profiles.delete);

    app.use('/api/profiles', router);
};