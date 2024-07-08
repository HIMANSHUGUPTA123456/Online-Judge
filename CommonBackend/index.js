import express from "express";
import cors from "cors";
import DBConnection from "./db/connection.js";
import cookieParser from "cookie-parser";
import compilerRouter from "./routes/compilerRoutes.js";
import authRouter from "./routes/authRouter.js";
import testRouter from "./routes/test.js";
import problemRouter from "./routes/problemRouter.js";
import problemUserRouter from "./routes/problemUserRounter.js";
import userRouter from "./routes/UserRouter.js";
const app = express();
DBConnection();
app.use(
  cors({
    origin: [process.env.CLIENT, process.env.RELEASE, process.env.PRODUCTION], // your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/compiler", compilerRouter);
app.use("/auth", authRouter);
app.use("/problem", problemRouter);
app.use("/question", problemUserRouter);
app.use("/user", userRouter);
app.use("/", testRouter);

app.listen(process.env.PORT, () => {
  console.log("[SERVER COMPILER RUNNNING]");
});
