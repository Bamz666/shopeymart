import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fetchStores, deleteStore } from "../utils/fetchStore";
import { Link } from "react-router-dom";

function StoreComponent() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesData = await fetchStores();

        if (Array.isArray(storesData)) {
          setStores(storesData);
        } else {
          console.error("Data fetched is not an array:", storesData);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (selectedStoreId) => {
    try {
      await deleteStore(selectedStoreId);
      const updatedStores = stores.filter(
        (store) => store.id !== selectedStoreId
      );
      setStores(updatedStores);
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    if (selectedStore) {
      swal({
        title: "Konfirmasi",
        text: "Yakin data dihapus?",
        icon: "warning",
        buttons: ["Batal", "Hapus"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          handleDelete(selectedStore.id);
          swal("Data telah dihapus!", {
            icon: "success",
          });
        } else {
          swal("Data tidak jadi dihapus.");
        }
      });
    }
  };

  return (
    <div className="content">
      <div className="page-inner">
        <div className="page-header">
          <h4 className="page-title">Data Toko</h4>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Data Toko</h4>
                <div>
                  <a href="/addStore">
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
                        <th>No SIUP</th>
                        <th>Nama Toko</th>
                        <th>Alamat</th>
                        <th>Nomor Hp</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>No</th>
                        <th>No SIUP</th>
                        <th>Nama Toko</th>
                        <th>Alamat</th>
                        <th>Nomor Hp</th>
                        <th>Aksi</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {stores.map((store, index) => (
                        <tr key={store.id}>
                          <td>{index + 1}</td>
                          <td>{store.noSiup}</td>
                          <td>{store.name}</td>
                          <td>{store.address}</td>
                          <td>{store.mobilePhone}</td>
                          <td>
                            <Link to={`/updateStore/${store.id}`}>
                              <button
                                type="button"
                                className="btn btn-icon btn-round btn-primary"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>{" "}
                            </Link>
                            &nbsp;
                            <button
                              type="button"
                              className="btn btn-icon btn-round btn-danger"
                              onClick={() => {
                                setSelectedStore(store);
                                handleDeleteConfirmation();
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
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

export default StoreComponent;
