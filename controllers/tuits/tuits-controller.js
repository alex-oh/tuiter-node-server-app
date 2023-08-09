import posts from "./tuits.js";
let tuits = posts;
const createTuit = (req, res) => {
    const newTuit = req.body;
    // generate a new id for the tuit
    newTuit._id = new Date().getTime() + "";
    newTuit.likes = 0;
    newTuit.liked = false;
    // append new tuit to tuits array
    tuits.push(newTuit);
    res.json(newTuit);
};
const findTuits = (req, res) => {
    res.json(tuits);
    // const tuitId = req.params._id;
    // const tuit = tuits.find((t) => t._id === tuitId);
    // res.json(tuit);
};
const updateTuit = (req, res) => {
    const tuitId = req.params["tid"];
    const updates = req.body;
    // find index of tuit to update
    const tuitIndex = tuits.findIndex((t) => t._id === tuitId);
    // update the tuit
    tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    res.sendStatus(200);
};
const deleteTuit = (req, res) => {
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params["tid"];
    tuits = tuits.filter((t) => t._id !== tuitdIdToDelete);
    res.sendStatus(200);
};
export default (app) => {
    app.post("/api/tuits", createTuit);
    app.get("/api/tuits", findTuits);
    app.put("/api/tuits/:tid", updateTuit);
    app.delete("/api/tuits/:tid", deleteTuit);
};
