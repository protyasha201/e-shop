import React from "react";
import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { Modal } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const orderedProducts = [];
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  let history = useHistory();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setOrders(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const loadOrders = () => {
    let isMounted = true;
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setOrders(result);
        }
      });
    return () => {
      isMounted = false;
    };
  };

  orders.forEach((eachOrder) => {
    eachOrder.orderedProducts.forEach((order) => {
      if (order.userName) {
        orderedProducts.push(order.product);
      } else {
        orderedProducts.push(order);
      }
    });
  });

  const handleStatus = (e, product) => {
    product.status = e.target.value;
    axios
      .patch(`http://localhost:5000/updateStatus`, product)
      .then(function (response) {
        loadOrders();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteOrder = (product) => {
    axios
      .patch(`http://localhost:5000/deleteOrder`, product)
      .then(function (response) {
        loadOrders();
        setModalText("Order Delete Successfully");
        handleOpenModal();
      })
      .catch(function (error) {});
  };

  const goToOrderDetails = (parentKey, childKey) => {
    history.push(`orderDetails/${parentKey}/${childKey}`);
  };

  return (
    <section>
      <h1 className="text-lg condensed text-green-400">
        Manage Orders (
        <span className="text-gray-500">{orderedProducts.length}</span>)
      </h1>
      {orderedProducts.length > 0 ? (
        <div className="md:w-4/5 m-auto">
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
                  <TableCell align="center">
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Status
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderedProducts.map((eachProduct) => (
                  <TableRow key={eachProduct.key2}>
                    <TableCell component="th" scope="row">
                      <div>
                        <p className="light-blue-bg text-green-600 condensed inline-block p-1 rounded shadow">
                          {eachProduct.shippingDate}
                        </p>
                        <p>{eachProduct.productName}</p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="gap-4 flex justify-center gap-4 items-center">
                        <DeleteIcon
                          onClick={() => deleteOrder(eachProduct)}
                          className="shadow text-red-500 cursor-pointer hover:text-green-400"
                        />
                        <VisibilityIcon
                          onClick={() =>
                            goToOrderDetails(eachProduct.key, eachProduct.key2)
                          }
                          className="shadow text-blue-500 cursor-pointer hover:text-green-400"
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <select
                        className={
                          eachProduct.status === "Pending"
                            ? "rounded shadow-md p-2 montserrat font-bold text-gray-500 cursor-pointer bg-white"
                            : eachProduct.status === "Delivered"
                            ? "rounded shadow-md p-2 montserrat font-bold text-white cursor-pointer bg-green-300"
                            : eachProduct.status === "Canceled"
                            ? "shadow-md rounded p-2 montserrat font-bold text-white cursor-pointer bg-red-300"
                            : "shadow-md rounded p-2 montserrat font-bold text-white cursor-pointer bg-blue-300"
                        }
                        onChange={(e) => handleStatus(e, eachProduct)}
                        defaultValue={eachProduct.status}
                      >
                        <option className="text-xl">Pending</option>
                        <option className="text-xl">On Going</option>
                        <option className="text-xl">Delivered</option>
                        <option className="text-xl">Canceled</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        </div>
      ) : (
        <h1 className="text-center">Loading...</h1>
      )}
    </section>
  );
};

export default ManageOrders;
