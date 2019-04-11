const db = require("../config/knexConfig.js");

module.exports = {
  insert,
  update,
  remove,
  get,
  getById
};

function get() {
  return db("hobbits");
}

function getById(id) {
  return db("hobbits")
    .where({ id })
    .first();
}

function insert(hobbit) {
  return db("hobbits").insert(hobbit);
}

async function update(id, updated) {
  return db("hobbits")
    .where({ id })
    .update(updated);
}

function remove(id) {
  return db("hobbits")
    .where({ id })
    .del();
}
