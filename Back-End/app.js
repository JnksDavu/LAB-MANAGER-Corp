import express from "express";
import cors from "cors"; // Importando o cors
import routes from "./src/routes/salaRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

routes(app);

app.listen(5000, () => {
  console.log("Server está escutando na porta 5000");
});
