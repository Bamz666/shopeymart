import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");

  const baseUrl = "http://localhost:8081/auth";
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobilePhoneChange = (event) => {
    setMobilePhone(event.target.value);
  };

  const handleRegistration = async () => {
    const response = await axios.post(baseUrl, {
      username,
      password,
      email,
      mobilePhone,
      address,
      customerName,
    });
    navigate("/login");
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleRegistration();
      swal({
        title: "Registration Successful!",
        text: "You have successfully registered",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      swal({
        title: "Registration Failed",
        text: "Failed to register. Please try again.",
        icon: "error",
        button: "OK",
      });
    }
  };
  return (
    <>
      <div className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg mt-5">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">
                    Customer Register
                  </h1>
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
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label
                          htmlFor="customerName"
                          className="mb-2 text-muted"
                        >
                          Customer Name
                        </label>
                      </div>
                      <input
                        type="text"
                        id="customerName"
                        className="form-control"
                        value={customerName}
                        name="customerName"
                        onChange={handleCustomerNameChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        customerName must be filled
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label htmlFor="address" className="mb-2 text-muted">
                          Address
                        </label>
                      </div>
                      <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        name="address"
                        onChange={handleAddressChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        address must be filled
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label
                          htmlFor="mobilePhone"
                          className="mb-2 text-muted"
                        >
                          Mobile Phone
                        </label>
                      </div>
                      <input
                        type="text"
                        id="mobilePhone"
                        className="form-control"
                        value={mobilePhone}
                        name="mobilePhone"
                        onChange={handleMobilePhoneChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        mobilePhone must be filled
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label htmlFor="email" className="mb-2 text-muted">
                          Email
                        </label>
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        name="email"
                        onChange={handleEmailChange}
                        required
                        autoFocus
                      />
                      <div className="invalid-feedback">
                        email must be filled
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
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Register for admin?
                    <Link to="/registerAdmin" className="text-dark">
                      Create here
                    </Link>
                  </div>
                  <div className="text-center">
                    Already have account?
                    <Link to="/login" className="text-dark">
                      Login here
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

export default Register;
