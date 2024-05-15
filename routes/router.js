import express from "express";
import path from "path";
import fs from "fs";
const __dirname = path.resolve();
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

router.get("/deportes", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data/deportes.json", "utf-8"));
  console.log(data);
  res.send(data);
});

router.get("/agregar", (req, res) => {
  const { nombre, precio } = req.query;
  const sports = {
    nombre,
    precio,
  };
  const data = JSON.parse(fs.readFileSync("data/deportes.json", "utf-8"));
  const deporte = data.sports;
  deporte.push(sports);
  fs.writeFileSync("data/deportes.json", JSON.stringify(data));
  res.send("deporte agregado");
});

router.get("/editar", (req, res) => {
    const { nombre, precio } = req.query;
    const data = JSON.parse(fs.readFileSync("data/deportes.json", "utf-8"));
    const deporte = data.sports;
    const index = deporte.findIndex((d) => d.nombre == nombre);
    deporte[index].precio = precio
    fs.writeFileSync("data/deportes.json", JSON.stringify(data));
    
    res.send("deporte editado");

})

router.get("/eliminar", (req, res) => {
    const { nombre } = req.query;
    const data = JSON.parse(fs.readFileSync("data/deportes.json", "utf-8"));
    const deporte = data.sports;
    const index = deporte.findIndex((d) => d.nombre == nombre);
    deporte.splice(index, 1);
    fs.writeFileSync("data/deportes.json", JSON.stringify(data));
    res.send("deporte eliminado");
})

export default router;
