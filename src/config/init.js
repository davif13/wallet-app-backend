const tableQueries = require("../queries/tables");
const db = require("../db");

const init = async () => {
  try {
    await db.connect();
    // await db.query(tableQueries.createDatabase());
    await db.query(tableQueries.createUsers());
    await db.query(tableQueries.createFinances());
    await db.query(tableQueries.createCategories());
    console.log("Successfully created table");
    db.end();
    return;
  } catch (error) {
    throw new Error("Error configuring database", error);
  }
};

init();
