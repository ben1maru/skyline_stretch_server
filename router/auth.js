const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    
    // Hash the password
    bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        // Store the user in the database
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hash], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send('User registered');
        });
    });
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Retrieve the user from the database
    const query = 'SELECT email, password FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        
        const user = results[0];
        
        // Compare the provided password with the stored hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            if (!isMatch) {
                return res.status(401).send('Invalid password');
            }
            
            res.status(200).send('Login successful');
        });
    });
});

module.exports = router;