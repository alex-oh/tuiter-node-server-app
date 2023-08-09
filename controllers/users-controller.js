import people from "../users/users.js";
let users = people;
const UserController = (app) => {
    app.get("/api/users", findUsers);
    app.get("/api/users/:uid", findUserById);
    app.post("/api/users", createUser);
    app.delete("/api/users/:uid", deleteUser);
    app.put("/api/users/:uid", updateUser);

    // secondary api calls to run react examples
    app.post("/api/users/2", createUser2);
    app.delete("/api/users/2/:uid", deleteUser2);
    app.put("/api/users/2/:uid", updateUser2);
};
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
}
const createUser2 = (req, res) => {
    const {username} = req.params;
    const newUser = req.body; //
    users.push({
        _id: new Date().getTime().toString(),
        ...newUser
    });
    res.json(users);
}
export default UserController;
