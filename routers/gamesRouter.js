const express = require("express");
const gamesRouter = express.Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/games", gamesController.getGames);
gamesRouter.post("/games/add", gamesController.addGame);
gamesRouter.put("/games/:gameid", gamesController.updateGame);
gamesRouter.delete("/games/:gameid", gamesController.deleteGame);

module.exports = gamesRouter;
