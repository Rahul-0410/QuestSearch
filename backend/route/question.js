const express = require("express");
const router = express.Router();
const Question = require("../questions");

router.get("/", async (req, res) => {
  try {
    const { search = "", type, page = 1, limit = 10 } = req.query;
    
    // If no search term and no type filter, return empty results
    if (!search && !type) {
      return res.json({ total: 0, questions: [] });
    }

    const query = {};

    // Add search filter
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Add type filter for questions
    if (type && type !== "All") {
      query.type = type;
    }

    // Pagination to find the number of pages
    const skip = (page - 1) * limit;
    const questions = await Question.find(query).skip(skip).limit(Number(limit));

    // Total count of data
    const total = await Question.countDocuments(query);

    res.json({ total, questions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

module.exports = router;