const db = require("../data/dbConfig.js");

function getAllResources() {
  return db("resources");
}

function getResourceById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function addResource(data) {
  return db("resources")
    .insert(data)
    .then(ids => this.getResourceById(ids[0]));
}

function updateResouce(id, data) {
  return db("resources")
    .where({ id })
    .update(data)
    .then(count => (count > 0 ? this.getResourceById(id) : null));
}

function removeResource(id) {
  return db("resources")
    .where({ id })
    .del();
}

function getProjectResources(id) {
  return db("resources")
    .join("project_resources", "project_resources.resource_id", "resources.id")
    .where("project_resources.project_id", id);
}

function addProjectResource(id, data) {
  return db("project_resources")
    .insert(data)
    .then(() => this.getProjectResources(id));
}

module.exports = {
  getAllResources,
  getResourceById,
  addResource,
  updateResouce,
  removeResource,
  getProjectResources,
  addProjectResource
};
