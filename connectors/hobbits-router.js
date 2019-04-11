const router = require("express").Router();
const db = require("../config/knexConfig.js");
const Hobbits = require("../models/hobbits-model.js");

router.get("/", async (req, res) => {
  try {
    const hobbits = await Hobbits.get();

    res.status(200).json(hobbits);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const hobbit = await Hobbits.getById(id);

    if (hobbit) {
      res.status(200).json(hobbit);
    } else {
      res.status(404).json({ message: "Hobbit not found." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Please provide a name for this hobbit."
    });
  }

  try {
    const [id] = await Hobbits.insert(req.body);
    const hobbit = await Hobbits.getById(id);

    res.status(201).json(hobbit);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Hobbits.remove(id);

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "The hobbit could not be found." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updated = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Please provide a name for this hobbit."
    });
  }

  try {
    const count = await Hobbits.update(id, updated);

    if (count > 0) {
      const hobbit = await Hobbits.getById(id);
      res.status(200).json(hobbit);
    } else {
      res.status(200).json({ message: "Hobbit not found." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
