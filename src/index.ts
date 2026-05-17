import app from "./app"; // archivo de configuracion del servidor
const port = Bun.env.PORT || 3002; // si no encuentra el puerto 3001 por defecto estara el 3002

// levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
