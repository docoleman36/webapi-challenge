const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error adding user' })
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data", err });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const action = await db.get(req.params.id)
    res.status(201).json(action)
  } catch (err) {
    res.status(500).json({ message: 'Error getting users' })
  }
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error interacting with server" });
    });
});

router.put("/:id", (req, res) => {
  const updateInfo = req.body;
  updateInfo.id = req.params.id;
  updateInfo.project_id && updateInfo.description && updateInfo.notes
    ? db
      .update(updateInfo.id, updateInfo)
      .then(() => {
        db.get(updateInfo.id)
          .then(action => {
            res.status(201).json(action);
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "Error retrieving data from server" });
          });
      })
      .catch(err => {
        res.status(500).json({ message: "Error editing action", err });
      })
    : res
      .status(400)
      .json({
        message: "Bad request. Body is missing notes or project_id or description",
        updateInfo
      });
});

module.exports = router;