const db = require("../db");


// ADD CANDIDATE
exports.addCandidate = (req, res) => {

  const {
    election_id,
    candidate_name,
    party_name,
    manifesto
  } = req.body;

  // VALIDATION
  if (!election_id || !candidate_name) {
    return res.status(400).json({
      message: "Election and Candidate Name are required"
    });
  }

  const sql = `
    INSERT INTO candidates
    (election_id, candidate_name, party_name, manifesto)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      election_id,
      candidate_name,
      party_name,
      manifesto
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Database Error",
          error: err
        });
      }

      res.status(201).json({
        message: "Candidate Added Successfully"
      });

    }
  );

};


// GET ALL CANDIDATES
exports.getAllCandidates = (req, res) => {

  const sql = `
    SELECT * FROM candidates
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};


// GET CANDIDATES BY ELECTION
exports.getCandidatesByElection = (req, res) => {

  const electionId = req.params.electionId;

  const sql = `
    SELECT * FROM candidates
    WHERE election_id=?
  `;

  db.query(sql, [electionId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};


// DELETE CANDIDATE
exports.deleteCandidate = (req, res) => {

  const candidateId = req.params.id;

  const sql =
    "DELETE FROM candidates WHERE candidate_id=?";

  db.query(sql, [candidateId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Candidate Deleted Successfully"
    });

  });

};