const queries = require("../models/db/categoriesQueries");

exports.getCategories = async (req, res) => {
  try {
    const result = await queries.getCategories();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.messaage });
  }
};
exports.addCategory = async (req, res) => {
  try {
    const result = await queries.addCategory(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const result = await queries.updateCategory(
      req.body,
      req.params.categoryid
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const result = await queries.deleteCategory(req.params.categoryid);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
