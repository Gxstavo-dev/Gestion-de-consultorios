import app from "./app"; // archivo de configuracion del servidor
import { env } from "./config/env";

const port = env.PORT || 3002; // si no encuentra el puerto 3001 por defecto estara el 3002

// levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
