import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function UpdateStoreComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newStore, setNewStore] = useState({
    id: "",
    noSiup: "",
    name: "",
    address: "",
    mobilePhone: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    noSiup: "",
    name: "",
    address: "",
    mobilePhone: "",
  });
  const [alert] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    setNewStore({
      ...newStore,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const validationErrors = {
      id: newStore.id.trim() === "" ? "ID is required" : "",
      noSiup: newStore.noSiup.trim() === "" ? "NoSiup is required" : "",
      name: newStore.name.trim() === "" ? "Store Name is required" : "",
      address: newStore.address.trim() === "" ? "Address is required" : "",
      mobilePhone:
        newStore.mobilePhone.trim() === "" ? "Mobile Phone is required" : "",
    };

    setErrors(validationErrors);

    return Object.values(validationErrors).every((error) => error === "");
  };

  const handleUpdateStore = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      swal(
        "Error!",
        "Please fill in all the required fields correctly.",
        "error"
      );
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8081/store/v1`,
        newStore
      );

      if (response.status === 200) {
        swal("Success!", "Store updated successfully!", "success").then(() => {
          navigate("/dashboardStore");
        });
      } else {
        console.error("Failed to update store:", response.statusText);

        swal("Error!", "Failed to update store. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating store:", error);

      swal("Error!", "Failed to update store. Please try again.", "error");
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/store/v1/${id}`
        );
        const fetchedData = response.data;

        setNewStore(fetchedData);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchDataAndUpdateState();
  }, [id]);

  return (
    <div
      className="container mt-5 h-100 text-white"
      style={{ paddingBottom: "10em" }}
    >
      <h2 className="mb-4 text-dark" style={{ marginTop: "1.5em" }}>
        Form Update Store
      </h2>
      <Link to="/dashboardStore">
        <button type="button" className="btn btn-primary mb-3">
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Back
        </button>
      </Link>

      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <form onSubmit={handleUpdateStore}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label" hidden>
            ID:
          </label>
          <input
            disabled
            hidden
            type="text"
            className={`form-control ${errors.id && "is-invalid"}`}
            id="id"
            name="id"
            value={newStore.id}
            onChange={handleInputChange}
          />
          {errors.id && <div className="invalid-feedback">{errors.id}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="noSiup" className="form-label">
            NoSiup:
          </label>
          <input
            type="text"
            className={`form-control ${errors.noSiup && "is-invalid"}`}
            id="noSiup"
            name="noSiup"
            value={newStore.noSiup}
            onChange={handleInputChange}
          />
          {errors.noSiup && (
            <div className="invalid-feedback">{errors.noSiup}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Store Name:
          </label>
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            id="name"
            name="name"
            value={newStore.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            id="address"
            name="address"
            value={newStore.address}
            onChange={handleInputChange}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="mobilePhone" className="form-label">
            Mobile Phone:
          </label>
          <input
            type="text"
            className={`form-control ${errors.mobilePhone && "is-invalid"}`}
            id="mobilePhone"
            name="mobilePhone"
            value={newStore.mobilePhone}
            onChange={handleInputChange}
          />
          {errors.mobilePhone && (
            <div className="invalid-feedback">{errors.mobilePhone}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Update Store
        </button>
      </form>
    </div>
  );
}

export default UpdateStoreComponent;
