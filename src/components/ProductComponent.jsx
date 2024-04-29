import React, { useState, useEffect } from "react";
import { fetchProducts } from "../utils/fetchProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

function ProductComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        const productsData = response.data;

        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          console.error("Data fetched is not an array:", productsData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content">
      <div className="page-inner">
        <div className="page-header">
          <h4 className="page-title">Data Produk</h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Data Produk</h4>
                <div>
                  <a href="/addProduct">
                    <button
                      className="btn btn-md btn-round float-right"
                      style={{
                        marginTop: "-2.2rem",
                        backgroundColor: "#22668a",
                        color: "white",
                      }}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} /> Tambah
                    </button>
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="basic-datatables"
                    className="display table table-striped table-hover"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Stok Produk</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Stok Produk</th>
                        <th>Aksi</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={product.id}>
                          <td>{index + 1}</td>
                          <td>{product.productName}</td>
                          <td>{product.description}</td>
                          <td>{product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <a href="" style={{ textDecoration: "none" }}>
                              <button
                                type="button"
                                className="btn btn-icon btn-round btn-primary"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>{" "}
                              &nbsp;
                            </a>
                            <a href="">
                              <button
                                onClick={() =>
                                  window.confirm("Yakin data dihapus?")
                                }
                                type="button"
                                className="btn btn-icon btn-round btn-danger"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
