module.exports = app => {
    const profiles = require("../controllers/profile.controller.js");
    const auth = require("../controllers/auth.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    // Create a new profiles
    router.post("/",upload.single('file'),auth.isAuthenticated, profiles.create);

    // Retrieve all profiles
    router.get("/", profiles.findAll, auth.isAuthenticated);

    // Retrieve a single profiles with id
    router.get("/:id", auth.isAuthenticated, profiles.findOne);

    // Retrieve all motors equals an id
    router.get("/user/:id", auth.isAuthenticated, profiles.findAllByUserId);

    // Update a profile with id
    router.put("/:id",upload.single('file'), auth.isAuthenticated, profiles.update);

    // Delete a profiles with id
    router.delete("/:id", profiles.delete);

    app.use('/api/profiles', router);
};