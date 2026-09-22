import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const dbVersion = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersion.rows[0].server_version;
  console.log(dbVersionValue);
  // const dsMaxConnections = await database.query("SHOW max_connections");
  // const dbUsedConnections = await database.query(
  //   "SELECT COUNT(*) FROM pg_stat_activity",
  // );

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: dbVersionValue,
      },
    },
  });
}

export default status;
