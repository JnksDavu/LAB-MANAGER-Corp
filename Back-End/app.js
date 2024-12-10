import express from "express";
import cors from "cors"; // Importando o cors
import routes from "./src/routes/salaRoutes.js";
import routesUser from "./src/routes/usersRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

routes(app);
routesUser(app);

app.listen(5000, () => {
  console.log("Server está escutando na porta 5000");
});
