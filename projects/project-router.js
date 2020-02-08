const express = require("express");
const Projects = require("./project-model.js");

const router = express.Router();

//get all project
router.get("/", async (req, res, next) => {
  try {
    const projects = await Projects.getAllProjects();
    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res
        .status(404)
        .json({ message: "There are currently no projects in the database" });
    }
  } catch (err) {
    next(err);
  }
});

//get project by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.getProjectById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//add project
router.post("/", async (req, res, next) => {
  try {
    const payload = req.body;
    if (!req.body.project_name) {
      res.status(400).json({ message: "Please include a project_name" });
    } else {
      res.status(201).json(await Projects.addProject(payload));
    }
  } catch (err) {
    next(err);
  }
});

//update project
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!req.body.project_name) {
      res.status(400).json({ message: "Please include a project_name" });
    }
    const resource = await Projects.getProjectById(id);
    if (resource) {
      res.json(await Projects.updateProject(id, payload));
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//delete project
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.getProjectById(id);
    if (project) {
      res.json(await Projects.removeProject(id));
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//get project tasks
router.get("/:id/tasks", async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Projects.getProjectById(id);
    if (project) {
      res.json(await Projects.getTasks(id));
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

//add task to project
router.post("/:id/tasks", async (req, res, next) => {
  try {
    const payload = {
      task_description: req.body.task_description,
      task_notes: req.body.task_notes,
      project_id: req.params.id
    };
    const project = await Projects.getProjectById(req.params.id);
    if (project) {
      res.json(await Projects.addTask(payload));
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
