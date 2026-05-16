const db = require("../db");


// ADD CANDIDATE
exports.addCandidate = (req, res) => {

  const {
    election_id,
    candidate_name,
    party_name,
    manifesto
  } = req.body;

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
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Candidate Added Successfully"
      });

    }
  );

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