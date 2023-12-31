import * as tuitsDao from "../../tuits/tuits-dao.js";

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits(); // retrieve tuits from database
    res.json(tuits);
};
const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
};
const deleteTuit = async (req, res) => {
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params["tid"];
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
};
const updateTuit = async (req, res) => {
    const tuitIdToUpdate = req.params["tid"];
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitIdToUpdate, updates)
    res.sendStatus(status);
};
export default (app) => {
    app.post("/api/tuits", createTuit);
    app.get("/api/tuits", findTuits);
    app.put("/api/tuits/:tid", updateTuit);
    app.delete("/api/tuits/:tid", deleteTuit);
};
