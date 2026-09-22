test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  console.log(responseBody.dependencies.database.version);
  expect(responseBody.dependencies.database.version).toEqual("16.15");

  // const dbVersion = responseBody.db_version;
  // expect(responseBody.db_version).toEqual(dbVersion);

  // const dsMaxConnections = responseBody.ds_max_connections;
  // expect(responseBody.ds_max_connections).toEqual(dsMaxConnections);

  // const dbUsedConnections = responseBody.db_used_connections;
  // expect(responseBody.db_used_connections).toEqual(dbUsedConnections);
});
