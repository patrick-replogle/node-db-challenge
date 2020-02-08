const db = require("../data/dbConfig.js");

function getAllProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function addProject(data) {
  return db("projects")
    .insert(data)
    .then(ids => this.getProjectById(ids[0]));
}

function updateProject(id, data) {
  return db("projects")
    .where({ id })
    .update(data)
    .then(count => (count > 0 ? this.getProjectById(id) : null));
}

function removeProject(id) {
  return db("projects")
    .where({ id })
    .del();
}

//task models
function getTasks(id) {
  return db
    .select("tasks.*")
    .from("tasks")
    .where("tasks.project_id", id);
}

function getTaskById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function addTask(data) {
  return db("tasks")
    .insert(data)
    .then(ids => this.getTaskById(ids[0]));
}

function updateTask(id, data) {
  return db("tasks")
    .where({ id })
    .update(data)
    .then(count => (count > 0 ? this.getTaskById(id) : null));
}

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  removeProject,
  getTasks,
  getTaskById,
  addTask,
  updateTask
};
