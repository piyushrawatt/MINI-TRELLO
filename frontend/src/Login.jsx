import React, { useState } from "react";
import API from "./API/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);

      alert("Login Successful 🚀");

      navigate("/trello");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const createaccount = () => {
    navigate("/signup");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col select-none px-4"
      style={{ backgroundImage: "url('/bgtrello3.png')" }}
    >
      {/* Top Button */}
      <div className="h-[60px] flex justify-end items-center md:px-10 px-2">
        <button
          onClick={createaccount}
          className="text-sm border px-4 py-2 rounded-2xl cursor-pointer hover:scale-95 active:bg-red-400 transition"
        >
          Create Account
        </button>
      </div>

      {/* Center Login Box */}
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-[400px] min-h-[450px] md:min-h-[500px] bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col items-center justify-evenly p-6">
          
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Log in
          </h1>

          <form
            onSubmit={handlelogin}
            className="flex flex-col gap-6 items-center w-full"
          >
            {error && (
              <p className="text-red-500 text-sm font-semibold text-center">
                {error}
              </p>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className="border h-[45px] w-full rounded-2xl text-center px-3 outline-none"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className="border h-[45px] w-full rounded-2xl text-center px-3 outline-none"
            />

            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="border h-[45px] w-full md:w-[140px] rounded-2xl bg-red-400 hover:bg-red-500 transition"
            >
              {loading ? "Loading..." : "Log in"}
            </button>
          </form>

          <h2 className="hover:underline cursor-pointer text-sm md:text-base">
            Forgot password?
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;