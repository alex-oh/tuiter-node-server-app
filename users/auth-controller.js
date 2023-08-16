import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    const register = async (req, res) => {
        const {username, password} = req.body;
        const existingUser = await usersDao.findUserByUsername(username);
        if (existingUser) {
            res.sendStatus(409);
            return;
        }
        const user = {
            username,
            password
        }
        const newUser = await usersDao.createUser(user);
        console.log(newUser);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };
    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao.findUserByCredentials(username, password);
        console.log(user);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.json({error: "User not found"});
            return;
        }
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        console.log(currentUser);
        res.json(currentUser);
    };
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    
    // const update = (req, res) => {};
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    // app.put("/api/users", update);
};

export default AuthController;
