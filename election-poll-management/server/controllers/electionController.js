const db = require("../db");


// CREATE ELECTION
exports.createElection = (req, res) => {

  const {
    title,
    description,
    start_date,
    end_date,
    status
  } = req.body;

  const sql = `
    INSERT INTO elections
    (title, description, start_date, end_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, start_date, end_date, status],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Election Created Successfully"
      });

    }
  );

};



// GET ALL ELECTIONS
exports.getAllElections = (req, res) => {

  const sql = "SELECT * FROM elections";

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

};



// UPDATE ELECTION
exports.updateElection = (req, res) => {

  const electionId = req.params.id;

  const {
    title,
    description,
    start_date,
    end_date,
    status
  } = req.body;

  const sql = `
    UPDATE elections
    SET title=?,
        description=?,
        start_date=?,
        end_date=?,
        status=?
    WHERE election_id=?
  `;

  db.query(
    sql,
    [
      title,
      description,
      start_date,
      end_date,
      status,
      electionId
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Election Updated Successfully"
      });

    }
  );

};



// DELETE ELECTION
exports.deleteElection = (req, res) => {

  const electionId = req.params.id;

  const sql =
    "DELETE FROM elections WHERE election_id=?";

  db.query(sql, [electionId], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Election Deleted Successfully"
    });

  });

};