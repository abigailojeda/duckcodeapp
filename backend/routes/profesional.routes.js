module.exports = app => {
    const profesionals = require("../controllers/profesional.controller.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new Motorbikes
    router.post("/", auth.isAuthenticated, profesionals.create);

    // Retrieve all Motorbikes
    router.get("/", auth.isAuthenticated, profesionals.findAll);

    // Retrieve a single Motorbikes with id
    router.get("/:id", auth.isAuthenticated, profesionals.findOne);

    // Retrieve all motors equals an id
    router.get("/user/:id", auth.isAuthenticated, profesionals.findAllByUserId);

    // Update a Motorbikes with id
    router.put("/:id", auth.isAuthenticated, profesionals.update);

    // Delete a Motorbikes with id
    router.delete("/:id", auth.isAuthenticated, profesionals.delete);

    app.use('/api/profesionals', router);
};