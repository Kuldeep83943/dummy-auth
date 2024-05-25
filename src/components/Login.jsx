import React from "react";
import { useState } from "react";

const Login = ({setIsLoggedIn, setId}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          //expiresInMins: 30, // optional, defaults to 60
        }),
      })
        // .then((res) => res.json())
        // .then(console.log);
        const data = await res.json();

        if(res.ok){
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.id);
            setId(data.id);
            setIsLoggedIn(true);
        }else{
            setError(data.message);
        }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container-fluid ">
        <form className="col-md-4 mx-auto shadow p-5" onSubmit={handleSubmit}>
          
          <h3 className="text-center">Sign in </h3>
          <div className=" mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className=" mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid  mt-4">
            <button className="btn btn-primary">Login</button>
          </div>

          {error && <p className="error-message text-center">{error}</p>}

        </form>

        
      </div>
    </div>
  );
};

export default Login;
