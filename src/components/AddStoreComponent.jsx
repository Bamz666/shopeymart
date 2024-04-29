import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStoreComponent() {
  const [noSiup, setnoSiup] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [mobilePhone, setmobilePhone] = useState("");

  const baseUrl = "http://localhost:8081/store/v1";
  const navigate = useNavigate();

  const handlenoSiupChange = (event) => {
    setnoSiup(event.target.value);
  };

  const handlenameChange = (event) => {
    setname(event.target.value);
  };
  const handleaddressChange = (event) => {
    setaddress(event.target.value);
  };

  const handlemobilePhoneChange = (event) => {
    setmobilePhone(event.target.value);
  };

  const handleAddStore = async () => {
    const response = await axios.post(baseUrl, {
      noSiup,
      name,
      address,
      mobilePhone,
    });
    navigate("/dashboardStore");
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleAddStore();
      swal({
        title: "Add Store Successful!",
        text: "You have successfully registered",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error during adding data:", error);
      swal({
        title: "Add Store Failed",
        text: "Failed to register. Please try again.",
        icon: "error",
        button: "OK",
      });
    }
  };
  return (
    <div className="page-inner">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Tambah Data Store</div>
            </div>
            <form noValidate autoCapitalize="off" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">No SIUP</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={noSiup}
                            onChange={handlenoSiupChange}
                            name="nama"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan No SIUP"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Nama Toko</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={name}
                            onChange={handlenameChange}
                            name="nama toko"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Nama Toko Store"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Alamat Toko</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={address}
                            onChange={handleaddressChange}
                            name="harga"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Alamat Toko"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Nomor hp</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={mobilePhone}
                            name="stok"
                            onChange={handlemobilePhoneChange}
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Nomor hp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <center>
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#22668a", color: "white" }}
                  >
                    Simpan
                  </button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStoreComponent;
