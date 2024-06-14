const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/coating', (req, res) => {
    const query = 'SELECT id, name, description FROM coating';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});

module.exports = router;