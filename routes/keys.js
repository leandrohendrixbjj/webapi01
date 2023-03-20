const express = require('express');
const router = express.Router();
const db = require('../model/keyModel');

router.post('/', async (req, res, next) => {
  try {
    const key = await db.create()
    res.status(201).json({ key });
  } catch (error) {
    res.status(400).json({ error })
  }
});

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
    const dataExists = await db.findOne(id);

    if (!dataExists)
      res.status(404).json({ error: "key is not avail" });

    res.status(200).json(await db.findOne(id));
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataExists = await db.findOne(id);

    if (!dataExists)
      res.status(404).json({ error: "key is not avail" });

    let key = await db.update(id, req.body)
    res.status(201).json({ key });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.remove(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error })
  };
});

module.exports = router;
