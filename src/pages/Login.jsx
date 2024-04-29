import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = "http://localhost:8081/auth/login";
  const navigate = useNavigate();
  //   const location = useLocation();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (username, password) => {
    const response = await axios.post(baseUrl, { username, password });
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("role", response.data.data.role);
    console.log(response);
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleLogin(username, password);
      setUsername("");
      setPassword("");
      swal({
        title: "Logged In!",
        text: "Logged in",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <img src="lawrence.jpg" alt="" width="100" />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form
                    className="needs-validation"
                    noValidate
                    autoCapitalize="off"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <label htmlFor="username" className="mb-2 text-muted">
                        Username
                      </label>
                      <input
                        type="username"
                        id="username"
                        className="form-control"
                        value={username}
                        name="username"
                        onChange={handleUsernameChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        username is invalid
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label htmlFor="password" className="mb-2 text-muted">
                          Password
                        </label>
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        Password must be filled
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          className="form-check-input"
                          id="remember"
                        />
                        <label htmlFor="remember" className="form-check-label">
                          Remember Me
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary ms-auto">
                        Login
                      </button>
                    </div>
                  </form>
                </div>

                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?
                    <Link to="/register" className="text-dark">
                      Create One
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 text-muted">
                Copyright &copy; 2024 &mdash; Shopeymart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
