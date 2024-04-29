import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function AddProductComponent() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [storeId, setStoreId] = useState("");
  const [stores, setStores] = useState([]);

  const baseUrl = "http://localhost:8081/product";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:8081/store/v1");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleStoreIdChange = (event) => {
    setStoreId(event.target.value);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(baseUrl, {
        productName,
        description,
        price,
        stock,
        storeId: { id: storeId },
      });
      navigate("/dashboardProduct");
      console.log(response);
      swal({
        title: "Add Product Successful!",
        text: "You have successfully added a new product",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      swal({
        title: "Add Product Failed",
        text: "Failed to add product. Please try again.",
        icon: "error",
        button: "OK",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleAddProduct();
    } catch (error) {
      console.error("Error during adding data:", error);
    }
  };

  return (
    <div className="page-inner">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Tambah Data Produk</div>
            </div>
            <form noValidate autoCapitalize="off" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Nama Produk</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={productName}
                            onChange={handleProductNameChange}
                            name="nama"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Nama Produk"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Deskripsi</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            name="deskripsi"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Deskripsi Produk"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Harga Produk</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={price}
                            onChange={handlePriceChange}
                            name="harga"
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Harga Produk"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="jd">Stok Produk</label>
                          <small
                            className="text-danger"
                            style={{ fontSize: "1rem" }}
                          >
                            *
                          </small>
                          <input
                            type="text"
                            value={stock}
                            name="stok"
                            onChange={handleStockChange}
                            className="form-control"
                            id="jd"
                            placeholder="Masukkan Stok Produk"
                          />
                        </div>
                      </div>

                      <center>
                        <div className="form-group col-md-6">
                          <label>Pilih Toko</label>
                          <select
                            className="form-control"
                            onChange={handleStoreIdChange}
                            value={storeId}
                          >
                            <option value="">Pilih Toko</option>
                            {stores.map((store) => (
                              <option key={store.id} value={store.id}>
                                {store.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </center>
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

export default AddProductComponent;
