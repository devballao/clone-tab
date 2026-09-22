import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsRsult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsRsult.rows[0].max_connections;

  const databaseOpenedConnectionsRsult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [`${databaseName}`],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsRsult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
