import express from "express";
import userRouter from "./routes/users.routes.js";
import adminRouter from "./routes/admin.routes.js";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8080);

app.use(
	cors({
		origin: "http://127.0.0.1:5173",
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Internal Server Error");
});

app.use("/api/user", userRouter);
app.use("/", adminRouter);

app.listen(8080, () => {
	console.log(`Server on port ${process.env.PORT || 8080}`);
});
