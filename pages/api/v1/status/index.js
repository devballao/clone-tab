import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 AS sum;");
  console.log(result.rows[0]);
  response.status(200).json({ chave: "Testando, mas dessa vez em JSON" });
}

export default status;
