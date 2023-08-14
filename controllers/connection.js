

import Connection from "../models/connection.js";

export const addConnection = async (req, res) => {
    const { userA, userB } = req.body;

    try {
        const connection = await Connection.create({ userA, userB });
        res.status(201).json(connection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeConnection = async (req, res) => {
    const connectionId = req.params.id;

    try {
        const removedConnection = await Connection.findByIdAndDelete(connectionId);
        if (!removedConnection) {
            return res.status(404).json({ message: "Connection not found" });
        }
        res.json({ message: "Connection removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
