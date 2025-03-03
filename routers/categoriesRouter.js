const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/categories", categoriesController.getCategories);
categoriesRouter.post("/categories/add", categoriesController.addCategory);
categoriesRouter.put(
  "/categories/:categoryid",
  categoriesController.updateCategory
);
categoriesRouter.delete(
  "/categories/:categoryid",
  categoriesController.deleteCategory
);

module.exports = categoriesRouter;
