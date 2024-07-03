import React, { useState, useEffect } from "react";
import { updateUser, getUserById } from "../apiService/apiService";
import Navbar from "../components/Navbar";
import TokenManager from "../apiService/TokenManager";

export default function UpdateUser() {
  const userId = TokenManager.getClaims()?.userId;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    id: userId,
    name: "",
    email: "",
    password: "",
  });
  function handleGet() {
    getUserById(userId)
      .then((data) => {
        setUser(data);
        setPreviousPassword(data.password);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });
  }

  useEffect(() => {
    handleGet();
  }, []);

  function handleInputChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    debugger;
    event.preventDefault();
    if (user.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    updateUser(user)
      .then((data) => {
        alert("User updated successfully");
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Update user</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Previous Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
                  <label>Role</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={handleInputChange}
                        type="radio"
                        name="userType"
                        id="seller"
                        value="seller"
                        checked={user.userType === "seller"}
                      />
                      <label className="form-check-label" htmlFor="seller">
                        Seller
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={handleInputChange}
                        type="radio"
                        name="userType"
                        id="buyer"
                        value="buyer"
                        checked={user.userType === "buyer"}
                      />
                      <label className="form-check-label" htmlFor="buyer">
                        Buyer
                      </label>
                    </div>
                  </div>
                </div> */}
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
