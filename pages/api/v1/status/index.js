function status(request, response) {
  response.status(200).json({ chave: "Testando, mas dessa vez em JSON" });
}

export default status;
