import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const orderedProducts = [];

  const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
  });

  const classes = useStyles();

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

  return (
    <section>
      <h1 className="text-lg condensed text-blue-400">
        Orders -{orderedProducts.length}
      </h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
                <TableCell align="center">{eachProduct.category}</TableCell>
                <TableCell align="center">{eachProduct.subCategory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ManageOrders;
