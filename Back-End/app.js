import express from "express";
import routes from "./src/routes/salaRoutes.js";

const app = express();
routes(app);

app.listen(5000, () => {
    console.log("Server está escutando na porta 5000");
  });