import express, { Request, Response } from "express";
import appRoutes from "./routes/appRoutes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { securityMiddlewares } from "./middlewares/securityMiddleware";

dotenv.config();

const app = express();

app.use(securityMiddlewares.helmet());
app.use(securityMiddlewares.rateLimiter());
app.use(securityMiddlewares.cors());


app.use(express.json());
app.use("/v1", appRoutes);

app.get("/healthCheck", (req: Request, res: Response) => {
  res.send("Wandernest-api is up and running!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
