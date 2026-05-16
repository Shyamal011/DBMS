const express = require("express");

const router = express.Router();

const {
  castVote,
  getResults
} = require("../controllers/voteController");


// ROUTES
router.post("/", castVote);

router.get("/results/:electionId", getResults);


module.exports = router;