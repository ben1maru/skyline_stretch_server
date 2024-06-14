const express = require("express");
const router = express.Router();
const db = require("../db"); // оновіть шлях до вашої конфігурації бази даних

// CREATE
router.post("/application", (req, res) => {
  const { phone_number, email, text, id_strech } = req.body;

  // Додати логування тіла запиту
  console.log("Request body:", req.body);

  const query =
    "INSERT INTO application (phone_number, email, text, id_strech, id_status) VALUES (?, ?, ?, ?, 1)";

  db.query(query, [phone_number, email, text, id_strech], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send("Internal Server Error");
    }
  });
});

// READ all
router.get("/application", (req, res) => {
  const query = `
    SELECT a.id, a.phone_number, a.email, a.text, a.id_strech, s.name AS status_name
    FROM application a
    JOIN status s ON a.id_status = s.id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get('/status', (req, res) => {
  const sql = 'SELECT `id`, `name` FROM `status`';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching status:', err);
      res.status(500).json({ error: 'Unable to fetch status' });
      return;
    }
    res.json(results);
  });
});

// UPDATE
router.put("/application/:id", (req, res) => {
  const { id } = req.params;
  const { id_status } = req.body;
  const query = "UPDATE application SET id_status = ? WHERE id = ?";
  db.query(query, [id_status, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Application not found");
    }
    res.status(200).send("Application updated");
  });
});

module.exports = router;
