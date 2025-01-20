// src/index.routes.js
import connectDB from "../DB/connection.js";
import {globalEroorHandling} from "../src/utils/errorHandling.js";
import AuthRouter from "./authentication/authentication.routes.js"
import MoodRouter from "./mood/mood.routes.js"


const initApp = (app, express) => {
    app.use(express.json());
    app.use("/auth",AuthRouter)
    app.use("/mood",MoodRouter)
  app.use("/*", (req, res, next) => {
    return res.json({ message: "Invalid Routing🚫" });
  });

  app.use(globalEroorHandling);

  connectDB();
};

export default initApp;
