const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req, res, next) => {
  res.json(db.all())
});

router.post('/', (req, res, next) => {
  const user = db.store(req.body)
  res.status(201).json({ user });
});

module.exports = router;
