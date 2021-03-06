import axios from "axios";
import React from "react";
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
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

const ManageOffers = () => {
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [offers, setOffers] = useState({
    offerImageUrl: "",
  });
  const [allOffers, setAllOffers] = useState([]);
  let history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const loadAllOffers = () => {
    fetch(`http://localhost:5000/offers`)
      .then((res) => res.json())
      .then((result) => {
        setAllOffers(result);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/offers`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setAllOffers(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUploadOfferImage = (e) => {
    setIsImageUploaded(false);
    const imageData = new FormData();
    imageData.set("key", "b07e1e0b5c689a98391f6a4377e0f41a");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setIsImageUploaded(true);
        const updateOffers = { ...offers };
        updateOffers.offerImageUrl = response.data.data.display_url;
        setOffers(updateOffers);
      })
      .catch(function (error) {
        setIsImageUploaded(false);
      });
  };

  const addOffer = (e) => {
    e.preventDefault();
    if (offers.offerImageUrl !== "") {
      axios
        .post("http://localhost:5000/addOffer", offers)
        .then(function (response) {
          loadAllOffers();
          setIsImageUploaded("");
          setModalText("Offer Added Successfully");
          handleOpenModal();
        })
        .catch(function (error) {
          setModalText(error.message);
          handleOpenModal();
        });
    } else {
      alert(
        "image was not uploaded successfully, click 'Add Offer' again without selecting an image"
      );
    }
  };

  const deleteOffer = (id) => {
    fetch(`http://localhost:5000/deleteOffer/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        loadAllOffers();
        setModalText("Offer Deleted Successfully");
        handleOpenModal();
      });
  };

  const handleViewOffer = (id) => {
    history.push(`/offerDetails/${id}`);
  };

  return (
    <section className="rounded md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">Manage Offers</h1>
      <form
        onSubmit={addOffer}
        className="border rounded flex flex-col w-full mt-3 sm:w-2/4 p-4 md:w-2/5"
      >
        <label className="cursor-pointer mt-4 flex flex-col lg:w-4/5">
          <span className="font-bold text-lg montserrat text-gray-600">
            Upload Image
          </span>
          <input
            onChange={handleUploadOfferImage}
            required
            id="offerImage"
            name="offerImage"
            type="file"
            className="shadow-md border rounded focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent p-3 sm:p-1 cursor-pointer hover:bg-blue-300"
          />
          {isImageUploaded !== "" && (
            <div>
              {isImageUploaded ? (
                <p className="mt-3 text-gray-500">
                  Image Uploaded Successfully
                </p>
              ) : (
                <p className="mt-3 text-gray-500">
                  Let the image upload before adding the offer
                </p>
              )}
            </div>
          )}
        </label>
        <input
          type="submit"
          className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-600"
          value="Add Offer"
        />
      </form>
      <div className="m-auto sm:w-3/4 mt-5">
        <h1 className="text-blue-400 font-bold montserrat text-md">
          All Offers({allOffers.length})
        </h1>
        {allOffers.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p className="text-gray-400 montserrat font-bold text-lg">
                      Offers
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
                {allOffers.map((eachOffer) => (
                  <TableRow key={eachOffer._id}>
                    <TableCell component="th" scope="row">
                      <p className="">
                        {eachOffer.offerImageUrl.slice(0, 20)}..
                      </p>
                    </TableCell>
                    <TableCell align="center">
                      <div className="gap-4 flex justify-center gap-4 items-center">
                        <DeleteIcon
                          onClick={() => deleteOffer(eachOffer._id)}
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
                          onClick={() => handleViewOffer(eachOffer._id)}
                          className="shadow text-blue-500 cursor-pointer hover:text-green-400"
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

export default ManageOffers;
