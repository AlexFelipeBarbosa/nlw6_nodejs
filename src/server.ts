import express from "express";

const app = express();

app.get("/teste", (request, response) => {
  return response.json({ message: "Alex Barbosa" });
});

app.post("/teste-post", (request, response) => {
  return response.json({ message: "Exemplo de Post!" });
});

app.listen(3333, () => {
  console.log("Server is running!");
});
