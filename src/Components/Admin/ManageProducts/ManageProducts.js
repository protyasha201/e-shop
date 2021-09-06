import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { Modal } from "@material-ui/core";

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
                      className="shadow text-black-500 cursor-pointer hover:text-green-400"
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
