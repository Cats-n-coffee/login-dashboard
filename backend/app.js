import "@babel/polyfill";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/appRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;

const corsConf = {
	credentials: true,
	origin: true,
};
app.use(cors(corsConf));
app.options("*", cors(corsConf));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
// for handling 404 errors
app.all("*", (req, res, next) => {
	const method = req.method;
	const msg = `Can't ${method} ${req.path}`;
	res.status(404).json({ msg });
});

app.listen(PORT, () => {
	console.log("my app listening");
});

export default app;
