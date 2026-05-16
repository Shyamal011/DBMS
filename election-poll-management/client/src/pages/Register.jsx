import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "voter"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);

    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (

    <div className="flex justify-center items-center h-[80vh]">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        >
          <option value="voter">Voter</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded hover:bg-blue-700"
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;