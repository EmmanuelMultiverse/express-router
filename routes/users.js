const express = require("express");
const { User } = require("../models");
const { check, validationResult } = require("express-validator");



const router = express.Router();

router.post("/", [
    check("name").not().isEmpty().trim(),
    check("age").not().isEmpty().isNumeric(),
    check("name").isLength({ min: 5, max: 15}),
])

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(400).send("Could not find users");
        }
        
    } catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send(`Could not find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(200).json({ error: errors.array()});
        }

        const user = await User.create(req.body);
        console.log(user);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send(`Could not create ${req.body}`);
        }

    } catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            const updatedUser = await user.update(req.body);
            res.status(200).json(updatedUser);
        } else {
            res.status(400).send(`Could not update ${req.params.id} with ${req.body}`);
        }

    } catch (err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            const deletedUser = await user.destroy();
            res.status(200).json(deletedUser);
        } else {
            res.status(400).send(`Could not delete ${req.params.id} with ${req.body}`);
        }

    } catch (err) {
        next(err);
    }
})

module.exports = router;





