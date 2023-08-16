import * as usersDao from '../users/users-dao.js';
let currentUser = null;

const UserController = (app) => {
    // find users
    const findAllUsers = async (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        } else {
            const users = await usersDao.findAllUsers();
            res.json(users);
        }
    };
    const findUserById = async (req, res) => {
        const userId = req.params.uid;
        const user = await usersDao.findUserById(userId);
        res.json(user);
    };
    const findUserByUsername = async (req, res) => {
        const usernameToFind = req.params.username;
        const user = await usersDao.findUserByUsername(usernameToFind);
        res.json(user);
    }
    // create user
    const createUser = async (req, res) => {
        const newUser = await usersDao.createUser(req.body);
        console.log(newUser);
        const users = await usersDao.findAllUsers();
        res.json(users);
    };
    // update users
    const updateUser = async (req, res) => {
        const userId = req.params["uid"];
        const status = await usersDao.updateUser(userId, req.body);
        const user = await usersDao.findUserById(userId)
        req.session["currentUser"] = user;
        res.json(status);
    };
    // delete users
    const deleteUser = async (req, res) => {
        const userId = req.params["uid"];
        const status = await usersDao.deleteUser(userId);
        const users = await usersDao.findAllUsers();
        res.json(users);
    };
    

    // secondary api calls to run react examples
    const updateUser2 = async (req, res) => {
        const userId = req.params["uid"];
        const updates = req.body; // pull the new user passed in thru the body
        console.log(updates);
        const status = await usersDao.updateUser(userId, updates);
        const user = await usersDao.findUserById(userId)
        const users = await usersDao.findAllUsers();
        res.json(users);
    };

    const register = (req, res) => {
        // provide a username and password
        const { username, password } = req.body;
        // check if user exists
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            // if it exists, stop the register operation
            res.json({ error: "User already exists" });
            return;
        }
        // create a user object
        const user = {
            _id: new Date().getTime() + "",
            username,
            password,
        };
        // update server state variable
        currentUser = user;
        // add user object to the users array
        users.push(user);
        // return the user object just created
        res.json(user);
    };
    const login = (req, res) => {
        const { username, password } = req.body;
        // set user if the username and password match with a users element in the server
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
        // user DNE
        if (!user) {
            res.json({ error: "user not found" });
            return;
        }
        currentUser = user;
        res.json(user);
    };
    const profile = (req, res) => {
        // retrieve current user
        res.json(currentUser);
    };
    const logout = (req, res) => {
        // change the currentUser to null since you're logging out
        // currentUser = null;

        // for express session: req session destroy does the same thing as above
        req.session.destroy();
        res.json({ status: "ok" });
    };

    app.get("/api/users", findAllUsers);
    app.get("/api/users/:uid", findUserById);
    app.get("/api/users/username/:username", findUserByUsername);
    app.post("/api/users", createUser);
    app.delete("/api/users/:uid", deleteUser);
    app.put("/api/users/:uid", updateUser);

    // secondary api calls to run react examples
    app.put("/api/users/2/:uid", updateUser2);

    //profile operation patterns
    // app.post("/api/users/register", register);
    // app.post("/api/users/login", login);
    // app.post("/api/users/profile", profile);
    // app.post("/api/users/logout", logout);
};
export default UserController;
