const sqlite3 = require("sqlite3").verbose();

function getDB() {
  return new sqlite3.Database("cdr.db");
}

module.exports = { getDB };