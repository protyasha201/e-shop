import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  let history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/allProducts`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setAllProducts(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const loadAllProducts = () => {
    fetch(`http://localhost:5000/allProducts`)
      .then((res) => res.json())
      .then((result) => {
        setAllProducts(result);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setProductsByCategory(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteProduct = (product) => {
    const matchedProduct = productsByCategory.filter(
      (eachProduct) => product.category === eachProduct.category
    );

    const productToDelete = {
      parentId: matchedProduct[0]._id,
      childId: product._id,
    };

    setModalText("Product Deleted Successfully");
    handleOpenModal();

    fetch(`http://localhost:5000/deleteProduct/${productToDelete.childId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        loadAllProducts();
      });
    axios
      .patch(`http://localhost:5000/deleteProductByCategory`, productToDelete)
      .then(function (response) {})
      .catch(function (error) {});
  };

  const handleViewProduct = (id) => {
    history.push(`/viewProduct/${id}`);
  };

  const goToEditPage = (id) => {
    history.push(`editProduct/${id}`);
  };

  return (
    <section className="rounded md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">
        Manage Products({allProducts.length})
      </h1>
      <div className="m-auto sm:w-3/4">
        {allProducts.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Product
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Actions
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProducts.map((eachProduct) => (
                  <TableRow key={eachProduct.key2}>
                    <TableCell component="th" scope="row">
                      <p className="">
                        {eachProduct.productName.slice(0, 20)}...
                      </p>
                    </TableCell>
                    <TableCell align="center">
                      <div className="gap-4 flex justify-center gap-4 items-center">
                        <DeleteIcon
                          onClick={() => deleteProduct(eachProduct)}
                          className="shadow text-red-500 cursor-pointer hover:text-green-400"
                        />
                        <Modal open={openModal} onClose={handleCloseModal}>
                          <div className="bg-white w-96 rounded m-auto mt-60 p-5 flex flex-col justify-center items-center">
                            <p className="text-gray-600 montserrat font-bold text-center">
                              {modalText}
                            </p>
                            <button
                              onClick={handleCloseModal}
                              className="mt-5 bg-green-400 hover:bg-green-500 p-2 w-20 text-white condensed text-lg rounded"
                            >
                              OK
                            </button>
                          </div>
                        </Modal>
                        <VisibilityIcon
                          onClick={() => handleViewProduct(eachProduct._id)}
                          className="shadow text-blue-500 cursor-pointer hover:text-green-400"
                        />
                        <EditIcon
                          onClick={() => goToEditPage(eachProduct._id)}
                          className="shadow cursor-pointer hover:text-green-400"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </section>
  );
};

export default ManageProducts;
