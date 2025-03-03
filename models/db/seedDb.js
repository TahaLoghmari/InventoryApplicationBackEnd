const pool = require("./pool");

async function seedDatabase() {
  try {
    // Check if categories table is empty
    const categoryCheck = await pool.query("SELECT COUNT(*) FROM categories");

    if (parseInt(categoryCheck.rows[0].count) === 0) {
      console.log("Seeding empty database...");

      // Insert categories
      await pool.query(`
        INSERT INTO categories (name, description, imageurl)
        VALUES 
          ('Action', 'Fast-paced games focusing on combat', 'https://example.com/action.jpg'),
          ('RPG', 'Role-playing games with character development', 'https://example.com/rpg.jpg'),
          ('Strategy', 'Games that require planning and strategic thinking', 'https://example.com/strategy.jpg')
      `);

      console.log("Database seeded successfully");
    } else {
      console.log("Database already contains data, skipping seed");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

module.exports = seedDatabase;
