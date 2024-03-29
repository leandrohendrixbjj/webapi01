const express = require('express');
const router = express.Router();
const db = require('../model/keyModel');
const keyController = require('../controllers/keyController.js')

router.get('/', async (req, res, next) => {
  try {
    res.json(await keyController.all())
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/', async (req, res, next) => {
  try {
    const key = await keyController.create()
    res.status(201).json({ key });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataExists = await keyController.findOne(id);

    if (dataExists)
      res.status(200).json(dataExists);

    res.status(404).json({ error: "key is not avail" });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataExists = await keyController.findOne(id);

    if (!dataExists)
      res.status(404).json({ error: "key is not avail" });

    let key = await keyController.update(id, req.body);
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
