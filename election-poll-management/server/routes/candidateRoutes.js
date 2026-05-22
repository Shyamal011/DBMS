const express = require("express");

const router = express.Router();

const {
  addCandidate,
  getAllCandidates,
  getCandidatesByElection,
  deleteCandidate
} = require("../controllers/candidateController");


// ADD CANDIDATE
router.post("/", addCandidate);

// GET ALL CANDIDATES
router.get("/", getAllCandidates);

// GET BY ELECTION
router.get("/:electionId", getCandidatesByElection);

// DELETE
router.delete("/:id", deleteCandidate);

module.exports = router;