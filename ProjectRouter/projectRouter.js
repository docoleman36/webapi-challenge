const express = require('express');

const db = require('../data/helpers/projectModel');
const router = express.Router();

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error adding user' })
    });
});

router.get('/', async (req, res) => {
  try {
    const project = await db.get(req.params.id)
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await db.get(req.params.id)
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await db.getProjectActions(req.params.id)
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: 'Error getting users posts' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removeProject = await db.remove(req.params.id)
    res.status(201).json(removeProject);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const update = await db.update(req.params.id, changes)
    res.status(201).json(update)
  } catch (err) {
    res.status(500).json({ err: "Cannot update" })
  }
});

module.exports = router;