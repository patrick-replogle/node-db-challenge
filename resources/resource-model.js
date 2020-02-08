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

module.exports = {
  getAllResources,
  getResourceById,
  addResource,
  updateResouce,
  removeResource
};
