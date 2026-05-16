const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

  const { full_name, email, password, role } = req.body;

  try {

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [full_name, email, hashedPassword, role || "voter"],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "User Registered Successfully"
        });

      }
    );

  } catch (error) {
    res.status(500).json(error);
  }
};



// LOGIN
exports.login = (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const user = result[0];

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role
      },
      "secretkey",
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  });

};