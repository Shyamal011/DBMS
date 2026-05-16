const db = require("../db");


// CAST VOTE
exports.castVote = (req, res) => {

  const {
    user_id,
    election_id,
    candidate_id
  } = req.body;

  // CHECK IF USER ALREADY VOTED
  const checkSql = `
    SELECT * FROM votes
    WHERE user_id=? AND election_id=?
  `;

  db.query(
    checkSql,
    [user_id, election_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      // ALREADY VOTED
      if (result.length > 0) {
        return res.status(400).json({
          message: "User has already voted in this election"
        });
      }

      const validateCandidateSql = `
        SELECT * FROM candidates
        WHERE candidate_id=? AND election_id=?
      `;

      db.query(
        validateCandidateSql,
        [candidate_id, election_id],
        (err, candidateResult) => {

          if (candidateResult.length === 0) {
            return res.status(400).json({
              message: "Candidate does not belong to this election"
            });
          }

          // continue vote insertion here
      });

      // INSERT VOTE
      const voteSql = `
        INSERT INTO votes
        (user_id, election_id, candidate_id)
        VALUES (?, ?, ?)
      `;

      db.query(
        voteSql,
        [user_id, election_id, candidate_id],
        (err, result) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message: "Vote Cast Successfully"
          });

        }
      );

    }
  );

};



// GET ELECTION RESULTS
exports.getResults = (req, res) => {

  const electionId = req.params.electionId;

  const sql = `
    SELECT
      c.candidate_id,
      c.candidate_name,
      c.party_name,
      COUNT(v.vote_id) AS total_votes

    FROM candidates c

    LEFT JOIN votes v
    ON c.candidate_id = v.candidate_id

    WHERE c.election_id = ?

    GROUP BY c.candidate_id

    ORDER BY total_votes DESC
  `;

  db.query(sql, [electionId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};