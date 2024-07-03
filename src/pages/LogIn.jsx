import { useNavigate } from "react-router-dom";
import TokenManager from "../apiService/TokenManager";
import Authentication from "../apiService/Authentication";
import { useState } from "react";
import "../style/style.css";
import { useSessionStorageState } from "ahooks";

export default function LogIn(props) {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useSessionStorageState("claims");

  function handleLogin(event) {
    event.preventDefault();
    Authentication.login(email, password)
      .then((claims) => {
        setClaims(claims);
        setToken(claims);
        if (props.onLogin) {
          props.onLogin(claims);
        }
        if (claims.roles.includes("BUYER")) {
          navigate("/products");
        }
        if (claims.roles.includes("SELLER")) {
          navigate("/postProduct");
        }
      })

      .catch(() => alert("Login failed!"))
      .catch((error) => console.error(error));
  }

  function goToRegister() {
    TokenManager.clear;
    setClaims(null);
    navigate("/register");
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center login-container">
        <div className="col-md-6">
          <div className="login-form">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <br />
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <br></br>
                <br></br>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={goToRegister}
                >
                  Create an account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
