import React, { useState } from "react";
import API from "./API/axios";
import Login from "./Login";

import { useNavigate } from "react-router-dom";
function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [gender,setgender] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handlesignup = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful 🚀");

      // // optional: auto redirect to login
      // window.location.href = "/login";
      navigate("/trello")

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  const login = ()=>{
    navigate("/")
  }

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/bgtrello3.png')" }}
    >
      <div className="h-[550px] w-[400px] bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col items-center justify-evenly">

        <h1 className="text-4xl font-bold">Sign Up</h1>

        <form
          onSubmit={handlesignup}
          className="flex flex-col gap-5 items-center"
        >
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Name"
            className="border h-[40px] w-[300px] rounded-2xl text-center"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            className="border h-[40px] w-[300px] rounded-2xl text-center"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="border h-[40px] w-[300px] rounded-2xl text-center"
          />
  
          <button
            type="submit"
            disabled={loading}
            className="border h-[40px] w-[120px] rounded-2xl bg-green-400 hover:bg-green-500"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p
      onClick={login}
          className="cursor-pointer hover:underline"
        >
          Already have an account? Log in
        </p>
      </div>
    </div>
  );
}

export default Signup;