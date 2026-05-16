const express = require("express");

const router = express.Router();

const {
  addCandidate,
  getCandidatesByElection,
  deleteCandidate
} = require("../controllers/candidateController");


// ROUTES
router.post("/", addCandidate);

router.get("/:electionId", getCandidatesByElection);

router.delete("/:id", deleteCandidate);


module.exports = router;