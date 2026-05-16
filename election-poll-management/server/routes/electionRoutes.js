const express = require("express");

const router = express.Router();

const {
  createElection,
  getAllElections,
  updateElection,
  deleteElection
} = require("../controllers/electionController");


// ROUTES
router.post("/", createElection);

router.get("/", getAllElections);

router.put("/:id", updateElection);

router.delete("/:id", deleteElection);


module.exports = router;