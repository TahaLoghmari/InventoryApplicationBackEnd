const pool = require("./pool");

async function getGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}
async function addGame(params) {
  const { name, price, platform, description, imageURL, categoryId } = params;
  const result = await pool.query(
    "INSERT INTO games (name, price, platform, description, imageURL, categoryId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, price, platform, description, imageURL, categoryId]
  );
  return result.rows[0];
}
async function updateGame(gameId, params) {
  const { name, price, platform, description, imageURL, categoryId } = params;
  const result = await pool.query(
    `UPDATE games SET 
        name = $1, 
        price = $2, 
        platform = $3, 
        description = $4, 
        imageURL = $5, 
        categoryId = $6 
      WHERE gameId = $7
      RETURNING *`,
    [name, price, platform, description, imageURL, categoryId, gameId]
  );

  return result.rows[0];
}
async function deleteGame(gameId) {
  const result = await pool.query(
    "DELETE FROM games where gameid = $1 RETURNING *",
    [gameId]
  );
  return result.rows[0];
}
module.exports = {
  getGames,
  addGame,
  updateGame,
  deleteGame,
};
