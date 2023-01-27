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

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await db.findOne(id));
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
  try {
    const { id } = req.params;

    const dataExists = await db.findOne(id);
    if (!dataExists)
      throw new Error("User is not avail")

    let user = await db.update(id, req.body)
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }

});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataExists = await db.findOne(id);
    if (!dataExists)
      throw new Error("User is not avail")

    await db.remove(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error })
  };
});

module.exports = router;
