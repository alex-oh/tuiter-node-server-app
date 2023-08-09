import express from "express";
import cors from "cors";
import session from "express-session";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUnitialized: false,
};
app.use(session(sessionOptions));
app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(4000);
