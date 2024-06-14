const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE
router.post("/color", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO color (name) VALUES (?)";
  db.query(query, [name], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(`Color added with ID: ${results.insertId}`);
  });
});

// READ
router.get("/color", (req, res) => {
  const query = "SELECT id, name FROM color";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get("/color/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT id, name FROM color WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Color not found");
    }
    res.status(200).json(results[0]);
  });
});

// UPDATE
router.put("/color/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = "UPDATE color SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Color not found");
    }
    res.status(200).send("Color updated");
  });
});

// DELETE
router.delete("/color/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM color WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Color not found");
    }
    res.status(200).send("Color deleted");
  });
});

module.exports = router;
