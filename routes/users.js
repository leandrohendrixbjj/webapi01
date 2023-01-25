const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.all())
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await db.store(req.body)
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  let user = db.update(id, req.body)
  res.status(201).json({ user });

});

module.exports = router;
