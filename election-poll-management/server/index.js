const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./db");


// ROUTES
const authRoutes = require("./routes/authRoutes");

const electionRoutes =
  require("./routes/electionRoutes");

const candidateRoutes =
require("./routes/candidateRoutes");

const voteRoutes =
  require("./routes/voteRoutes");

// MIDDLEWARE
app.use(cors());
app.use(express.json());


// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});