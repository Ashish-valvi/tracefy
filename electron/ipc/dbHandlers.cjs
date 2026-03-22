const { ipcMain } = require("electron");
const { getDB } = require("../services/database.cjs");

function registerDBHandlers() {
  ipcMain.handle("get-data", async (event, { table, page, limit }) => {
    return new Promise((resolve, reject) => {
      const db = getDB();
      const offset = (page - 1) * limit;

      db.all(
        `SELECT * FROM \`${table}\` LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) return reject(err);

          db.get(
            `SELECT COUNT(*) as count FROM \`${table}\``,
            [],
            (err2, result) => {
              if (err2) return reject(err2);

              db.close();

              resolve({
                data: rows,
                total: result.count,
              });
            }
          );
        }
      );
    });
  });
}

module.exports = registerDBHandlers;