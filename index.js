import "./env.js";
import express from "express";
import optionsRouter from "./src/features/options/options.routes.js";
import questionsRouter from "./src/features/questions/questions.routes.js";
import { connectUsingMongoose } from "./src/config/mongoose.config.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// configure cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res, next)=>{
  res.status(200).send("Welcome to the Polling System API");
});

// routes to question
app.use("/api/questions", questionsRouter);

// routes to option
app.use("/api/options", optionsRouter);

// error Handler
app.use((err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(500).send("Fatal error, Please try later");
  }
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send("404 Not Found!");
});

// server listening at port 3001
app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  connectUsingMongoose();
});
