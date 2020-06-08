const express = require("express");
const Resources = require("./resource-model.js");

const router = express.Router();

//get all resources
router.get("/", async (req, res, next) => {
  try {
    const resources = await Resources.getAllResources();
    if (resources.length > 0) {
      res.status(200).json(resources);
    } else {
      res
        .status(404)
        .json({ message: "There are currently no resources in the database" });
    }
  } catch (err) {
    next(err);
  }
});

//get resource by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await Resources.getResourceById(id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res
        .status(404)
        .json({ message: "The specified resource id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//add resource
router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    if (!req.body.resource_name) {
      res.status(400).json({ message: "Please include a resource_name" });
    } else {
      res.status(201).json(await Resources.addResource(payload));
    }
  } catch (err) {
    next(err);
  }
});

//update resource
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!req.body.resource_name) {
      res.status(400).json({ message: "Please include a resource_name" });
    }
    const resource = await Resources.getResourceById(id);
    if (resource) {
      res.json(await Resources.updateResouce(id, payload));
    } else {
      res
        .status(404)
        .json({ message: "The specified resource id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//delete resource
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await Resources.getResourceById(id);
    if (resource) {
      res.json(await Resources.removeResource(id));
    } else {
      res
        .status(404)
        .json({ message: "The specified resource id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
