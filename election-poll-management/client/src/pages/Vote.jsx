import { useEffect, useState } from "react";
import axios from "axios";

function Vote() {

  const [elections, setElections] = useState([]);

  const [selectedElection, setSelectedElection] =
    useState("");

  const [candidates, setCandidates] = useState([]);

  // GET LOGGED-IN USER
  const user =
    JSON.parse(localStorage.getItem("user"));

  // FETCH ELECTIONS
  const fetchElections = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/elections"
      );

      setElections(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH CANDIDATES
  const fetchCandidates = async (electionId) => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/candidates/${electionId}`
      );

      setCandidates(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // CAST VOTE
  const castVote = async (candidateId) => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/votes",
        {
          user_id: 1,
          election_id: selectedElection,
          candidate_id: candidateId
        }
      );

      alert(response.data.message);

    } catch (error) {
        console.log(error.response);
        alert(
            error.response?.data?.message ||
            error.message ||
            "Voting Failed"
        );
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    candidates.length === 0 ? (

      <div className="text-gray-500 text-xl">
        No Results Available
      </div>

    ) : (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Vote Now
      </h1>

      {/* SELECT ELECTION */}
      <div className="mb-10">

        <select
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-[300px]"
          onChange={(e) => {

            setSelectedElection(e.target.value);

            fetchCandidates(e.target.value);

          }}
        >

          <option value="">
            Select Election
          </option>

          {elections.map((election) => (

            <option
              key={election.election_id}
              value={election.election_id}
            >
              {election.title}
            </option>

          ))}

        </select>

      </div>

      {/* CANDIDATES */}
      <div className="grid grid-cols-2 gap-6">

        {candidates.map((candidate) => (

          <div
            key={candidate.candidate_id}
            className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/30 hover:scale-[1.02] transition"
          >

            <h2 className="text-2xl font-bold text-blue-600">
              {candidate.candidate_name}
            </h2>

            <p className="mt-3 text-gray-600">
              Party: {candidate.party_name}
            </p>

            <p className="mt-3">
              {candidate.manifesto}
            </p>

            <button
              onClick={() =>
                castVote(candidate.candidate_id)
              }
              className="mt-5 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Vote
            </button>

          </div>

        ))}

      </div>

    </div>
  )
)
}

export default Vote;