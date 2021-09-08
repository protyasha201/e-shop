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

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const orderedProducts = [];
  const [styleForStatus, setStyleForStatus] = useState(
    "p-2 rounded shadow text-white montserrat font-bold text-md cursor-pointer bg-blue-300"
  );

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

  orders.forEach((eachOrder) => {
    eachOrder.orderedProducts.forEach((order) => {
      if (order.userName) {
        orderedProducts.push(order.product);
      } else {
        orderedProducts.push(order);
      }
    });
  });

  console.log(orderedProducts);

  const handleStatus = (e, product) => {
    product.status = e.target.value;
    axios
      .patch(`http://localhost:5000/updateStatus`, product)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section>
      <h1 className="text-lg condensed text-blue-400">
        Orders -{orderedProducts.length}
      </h1>
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
                    {eachProduct.productName}
                  </TableCell>
                  <TableCell align="center">
                    <div className="gap-4 flex justify-center gap-4 items-center">
                      <DeleteIcon className="shadow text-red-500 cursor-pointer hover:text-green-400" />
                      <VisibilityIcon className="shadow text-blue-500 cursor-pointer hover:text-green-400" />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <select
                      className="shadow p-2 montserrat font-bold text-gray-500 cursor-pointer"
                      onChange={(e) => handleStatus(e, eachProduct)}
                      defaultValue={eachProduct.status}
                    >
                      <option className="text-xl">Pending</option>
                      <option className="text-xl">Delivered</option>
                      <option className="text-xl">Canceled</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default ManageOrders;
