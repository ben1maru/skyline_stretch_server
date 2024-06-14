const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/strech", (req, res) => {
  const { photo, name, id_color, id_coating, price } = req.body;
  const query =
    "INSERT INTO strech (photo, name, id_color, id_coating, price) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [photo, name, id_color, id_coating, price],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send(`Strech entry added with ID: ${results.insertId}`);
    }
  );
});

router.get("/strech", (req, res) => {
  const query = `
    SELECT 
      strech.id, 
      strech.photo, 
      strech.name, 
      strech.price, 
      color.name AS color_name,
      coating.name AS coating_name
    FROM 
      strech
    LEFT JOIN 
      color ON strech.id_color = color.id 
    LEFT JOIN 
      coating ON strech.id_coating = coating.id`;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});
router.get("/strechCards", (req, res) => {
  const query = "SELECT id, photo, name, id_color, id_coating, price FROM strech";
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

router.get("/strech/:id", (req, res) => {
  const { id } = req.params;
  const query = `
  SELECT 
  strech.id, 
  strech.photo, 
  strech.name, 
  strech.id_color, 
  strech.id_coating, 
  strech.price, 
  color.name AS color_name,
  coating.name AS coating_name, 
  coating.description AS coating_description 
FROM strech 
LEFT JOIN color ON strech.id_color = color.id 
LEFT JOIN coating ON strech.id_coating = coating.id 
WHERE strech.id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Strech entry not found");
    }
    res.status(200).json(results[0]);
  });
});
// UPDATE
router.put("/strech/:id", (req, res) => {
  const { id } = req.params;
  const { photo, name, id_color, id_coating, price } = req.body;
  console.log(req.body);
  const query =
    "UPDATE strech SET photo = ?, name = ?, id_color = ?, id_coating = ?, price = ? WHERE id = ?";
  db.query(
    query,
    [photo, name, id_color, id_coating, price, id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Strech entry not found");
      }
      res.status(200).send("Strech entry updated");
    }
  );
});

// DELETE
router.delete("/strech/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM strech WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Strech entry not found");
    }
    res.status(200).send("Strech entry deleted");
  });
});

module.exports = router;
