import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../redux/features/user/usersSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // localStorage.setItem("userInfo", JSON.stringify({ username, password }));
    e.preventDefault();
    try {
      const res = await dispatch(login({ username, password })).unwrap();
      navigate("/");
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <h5>login</h5>
      <div className="form-row">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="username"
          className="form-input"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="button button-block">
        login
      </button>
    </form>
  );
}
