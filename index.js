import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Bienvenido a mi primera API!");
});

app.get("/clientes", (req, res) => {
  const data = readData();
  res.json(data.clientes);
});

app.get("/clientes/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const cliente = data.clientes.find((cliente) => cliente.id === id);
  res.json(cliente);
});

app.post("/clientes", (req, res) => {
  const data = readData();
  const body = req.body;
  const newcliente = {
    id: data.clientes.length + 1,
    ...body,
  };
  data.clientes.push(newcliente);
  writeData(data);
  res.json(newcliente);
});

app.put("/clientes/:id", (req, res) => {
  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const clienteIndex = data.clientes.findIndex((cliente) => cliente.id === id);
  data.clientes[clienteIndex] = {
    ...data.clientes[clienteIndex],
    ...body,
  };
  writeData(data);
  res.json({ message: "Cliente actualizado con éxito" });
});

app.delete("/clientes/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const clienteIndex = data.clientes.findIndex((cliente) => cliente.id === id);
  data.clientes.splice(clienteIndex, 1);
  writeData(data);
  res.json({ message: "Cliente eliminado con éxito" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
