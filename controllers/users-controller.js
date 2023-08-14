import people from "../users/users.js";
let users = people;
let currentUser = null;

const UserController = (app) => {
    const updateUser = (req, res) => {
        const userId = req.params["uid"];
        const updates = req.body;
        users = users.map((usr) =>
            usr._id === userId ? { ...usr, ...updates } : usr
        );
        res.sendStatus(200);
    };
    const deleteUser = (req, res) => {
        const userId = req.params["uid"];
        users = users.filter((usr) => usr._id !== userId);
        res.sendStatus(200);
    };
    const createUser = (req, res) => {
        const newUser = req.body;
        newUser._id = new Date().getTime() + "";
        users.push(newUser);
        res.json(newUser);
    };
    const findUserById = (req, res) => {
        const userId = req.params.uid;
        const user = users.find((u) => u._id === userId);
        res.json(user);
    };
    const findUsers = (req, res) => {
        const type = req.query.type;
        if (type) {
            const usersOfType = users.filter((u) => u.type === type);
            res.json(usersOfType);
            return;
        }
        res.json(users);
    };

    // secondary api calls to run react examples
    const updateUser2 = (req, res) => {
        const userId = req.params["uid"];
        const updates = req.body; // pull the new user passed in thru the body
        users = users.map((usr) =>
            usr._id === userId ? { ...usr, ...updates } : usr
        );
        res.json(users);
    };
    const deleteUser2 = (req, res) => {
        const userId = req.params["uid"];
        users = users.filter((usr) => usr._id !== userId);
        res.json(users);
    };
    const createUser2 = (req, res) => {
        const { username } = req.params;
        const newUser = req.body; //
        users.push({
            _id: new Date().getTime().toString(),
            ...newUser,
        });
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

    app.get("/api/users", findUsers);
    app.get("/api/users/:uid", findUserById);
    app.post("/api/users", createUser);
    app.delete("/api/users/:uid", deleteUser);
    app.put("/api/users/:uid", updateUser);

    // secondary api calls to run react examples
    app.post("/api/users/2", createUser2);
    app.delete("/api/users/2/:uid", deleteUser2);
    app.put("/api/users/2/:uid", updateUser2);

    //profile operation patterns
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
};
export default UserController;
