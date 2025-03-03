const queries = require("../models/db/gamesQueries");

exports.getGames = async (req, res) => {
  try {
    const games = await queries.getGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.messaage });
  }
};
exports.addGame = async (req, res) => {
  try {
    const newGame = await queries.addGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    console.error("Error adding game:", error);
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ error: "A game with this name already exists" });
    }
    if (error.code === "23503") {
      return res
        .status(422)
        .json({ error: "Referenced category does not exist" });
    }
    res.status(500).json({ error: "Failed to add game to database" });
  }
};
exports.updateGame = async (req, res) => {
  try {
    let gameId = req.params.gameid;
    const result = await queries.updateGame(gameId, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit game to database" });
  }
};
exports.deleteGame = async (req, res) => {
  try {
    let gameId = req.params.gameid;
    const result = await queries.deleteGame(gameId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to edit game to database" });
  }
};
