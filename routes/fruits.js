const express = require("express");
const router = express.Router();
const { Fruit } = require("../models");
const { check, validationResult } = require("express-validator");

router.post("/", [])

router.post("/", [
    check("color").not().isEmpty().trim(),
    check("name").not().isEmpty().trim(),

], async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(200).json({ error: errors.array() });
        }

        const fruit = await Fruit.create(req.body);

        if (fruit) {
            res.status(200).json(fruit);
        } else {
            res.status(400).send(`Could not create fruit ${req.body}`);
        }

    } catch (err) {
        next(err);
    }
})

module.exports = router;