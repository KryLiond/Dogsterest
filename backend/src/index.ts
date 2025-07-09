import express from "express";
import dotenv from "dotenv";
import { dogRouter } from "./routes/dog.router";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", dogRouter);

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
