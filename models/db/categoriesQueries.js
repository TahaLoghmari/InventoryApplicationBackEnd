const pool = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT *  FROM categories");
  return rows;
}
async function addCategory(category) {
  const { name, description, imageURL } = category;
  const { rows } = await pool.query(
    "INSERT INTO categories(name,description,imageURL) VALUES($1,$2,$3) RETURNING *",
    [name, description, imageURL]
  );
  return rows[0];
}
async function updateCategory(category, categoryId) {
  const { name, description, imageURL } = category;
  const { rows } = await pool.query(
    "UPDATE categories SET name = $1 , description = $2 , imageURL = $3 WHERE categoryid = $4 RETURNING *",
    [name, description, imageURL, categoryId]
  );
  return rows[0];
}
async function deleteCategory(categoryId) {
  const { rows } = await pool.query(
    "DELETE FROM categories WHERE categoryid = $1 RETURNING *",
    [categoryId]
  );
  return rows[0];
}
module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
