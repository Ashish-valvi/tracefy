const { ipcMain } = require("electron");
const { getDB } = require("../services/database.cjs");

function getTableList() {
  ipcMain.handle("get-tables", async () => {
    const db = getDB();

    return new Promise((resolve, reject) => {
      db.all(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const tableNames = rows.map(r => r.name);
            resolve(tableNames);
          }
        }
      );
    });
  });
}

module.exports = { getTableList };