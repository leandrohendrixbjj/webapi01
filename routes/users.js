const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js')
const validate = require('../middleware/validate.js')

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await userController.getUsers())
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userController.findOne(id);

    if (!user) {
      res.status(404).json({ error: "user is not avail" });
    }
    res.status(200).json(user)

  } catch (error) {
    res.status(400).json({ error })
  }
});

router.post('/', validate, async (req, res, next) => {
  try {
    res.status(201).json(await userController.store(req.body));
  } catch (error) {
    res.status(400).json({ error })
  }
});

router.put('/:id', validate, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!await userController.findOne(id)) {
      res.status(404).json({ error: "user is not avail" });
    }

    let user = await userController.update(id, req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!await userController.findOne(id)) {
      res.status(404).json({ error: "user is not avail" });
    }
    await userController.remove(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error })
  };
});

module.exports = router;
