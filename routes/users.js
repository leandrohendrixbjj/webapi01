const express = require('express');
const router = express.Router();
const db = require('../model/db.js');
const userSchema = require('../model/userSchema.js');

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
      res.status(404).json({ error: "user is not avail" });

    res.status(200).json(await db.findOne(id));
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/', validationMiddleware, async (req, res, next) => {
  try {
    const user = await db.store(req.body)
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.put('/:id', validationMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataExists = await db.findOne(id);
    if (!dataExists)
      res.status(404).json({ error: "user is not avail" });

    let user = await db.update(id, req.body, true)
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.patch('/:id', async (req, res, next) => {
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
    await db.remove(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error })
  };
});

function validationMiddleware(req, res, next) {
  const { error } = userSchema.validate(req.body)

  if (error)
    res.status(422).json({ error })
  next();
}

module.exports = router;
