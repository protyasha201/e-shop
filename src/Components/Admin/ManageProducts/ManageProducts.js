import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  let history = useHistory();

  useEffect(() => {
    let isMounted = true;
    setInterval(() => {
      fetch(`http://localhost:5000/allProducts`)
        .then((res) => res.json())
        .then((result) => {
          if (isMounted) {
            setAllProducts(result);
          }
        });
    }, 3000);
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

  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">Manage Products</h1>
      <div className="p-5 shadow-md border m-auto sm:w-3/4">
        <h1 className="text-blue-400 font-bold montserrat text-md">
          All Products({allProducts.length})
        </h1>
        {allProducts.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <table className="w-full border">
            <thead className="text-left">
              <tr className="border">
                <th className="border p-2">Product Name</th>
                <th className="text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((eachProduct) => (
                <tr key={eachProduct._id}>
                  <td className="montserrat font-bold border p-2">
                    {eachProduct.productName.slice(0, 35)}...
                  </td>
                  <td className="flex justify-center gap-4 items-center p-2 border">
                    <DeleteIcon
                      onClick={() => deleteProduct(eachProduct)}
                      className="text-red-500 cursor-pointer hover:text-green-400"
                    />
                    <VisibilityIcon
                      onClick={() => handleViewProduct(eachProduct._id)}
                      className="text-blue-500 cursor-pointer hover:text-green-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default ManageProducts;
