const fs = require("fs");
const csv = require("fast-csv");
const { getDB } = require("./database.cjs");

const BATCH_SIZE = 500;

function processCSV(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject("❌ File not found");
    }

    let lineNumber = 0;
    let header = [];
    let tableName = "";
    let batch = [];
    let dataStartLine = null;

    const db = getDB();

    // STEP 1: Find header & data start
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: false }))
      .on("data", (row) => {
        lineNumber++;

        if (
          header.length === 0 &&
          row.includes("Type of Connection") &&
          row.includes("Call date")
        ) {
          header = row.map((h, i) =>
            !h
              ? `column_${i}`
              : h.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")
          );
        }

        if (header.length > 0 && !dataStartLine && row[0]?.length === 12) {
          tableName = "cdr_" + row[0].replace(/[^a-zA-Z0-9]/g, "");
          dataStartLine = lineNumber;
        }
      })
      .on("end", () => {
        if (!dataStartLine) return reject("❌ Data start not found");

        createTableAndInsert();
      });

    function createTableAndInsert() {
      db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS \`${tableName}\``);

        const columns = header.map(h => `\`${h}\` TEXT`).join(", ");

        db.run(`
          CREATE TABLE \`${tableName}\` (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ${columns}
          )
        `, startInsert);
      });
    }

    function startInsert() {
      let line = 0;

      fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: header }))
        .on("data", (row) => {
          line++;
          if (line < dataStartLine) return;

          batch.push(row);
          if (batch.length === BATCH_SIZE) insertBatch();
        })
        .on("end", () => {
          insertBatch();
          db.close();
          resolve("✅ DB Created Successfully");
        });
    }

    function insertBatch() {
      if (batch.length === 0) return;

      db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        const columns = header.map(h => `\`${h}\``).join(", ");
        const placeholders = header.map(() => "?").join(", ");

        const stmt = db.prepare(`
          INSERT INTO \`${tableName}\` (${columns})
          VALUES (${placeholders})
        `);

        batch.forEach(row => {
          const values = header.map(h => row[h] || null);
          stmt.run(values);
        });

        stmt.finalize();
        db.run("COMMIT");
      });

      batch = [];
    }
  });
}

module.exports = { processCSV };