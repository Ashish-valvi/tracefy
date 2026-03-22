const { ipcMain, dialog } = require("electron");
const { getDB } = require("../services/database.cjs");
const db = getDB();


function tableHandle(){
    ipcMain.handle("get-table-data", async (event, { tableName, limit, offset }) => {
  return new Promise((resolve, reject) => {

    const dataQuery = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;

    db.all(dataQuery, [limit, offset], (err, rows) => {
      if (err) return reject(err);

      db.get(countQuery, [], (err2, countResult) => {
        if (err2) return reject(err2);

        const columns = rows.length ? Object.keys(rows[0]) : [];

        resolve({
          rows,
          columns,
          total: countResult.total, // 🔥 IMPORTANT
        });
      });
    });

  });
});

}




module.exports = tableHandle;