import { createUser } from "../apiService/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [post, setPost] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleInput(event) {
    setPost({ ...post, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    debugger;
    if (post.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    createUser(post);
    goToLogin();
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center registration-container">
          <div className="col-md-6">
            <div className="registration-form">
              <h2 className="text-center mb-4">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    name="name"
                    onChange={handleInput}
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={handleInput}
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={handleInput}
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={handleInput}
                        type="radio"
                        name="userType"
                        id="seller"
                        value="seller"
                        checked={post.userType === "seller"}
                      />
                      <label className="form-check-label" htmlFor="seller">
                        Seller
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={handleInput}
                        type="radio"
                        name="userType"
                        id="buyer"
                        value="buyer"
                        checked={post.userType === "buyer"}
                      />
                      <label className="form-check-label" htmlFor="buyer">
                        Buyer
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    Register
                  </button>
                  <br></br><br></br>
                  <button
                    onClick={goToLogin}
                    className="btn btn-primary btn-block"
                  >
                    Already have an account?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
