import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladoDeErros from "./middlewares/manipuladoDeErros.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => {
	console.log("Conexão com banco feita com sucessooo !!!");
});

const app = express();

app.use(express.json());

routes(app);

app.use(manipuladoDeErros);

export default app;
