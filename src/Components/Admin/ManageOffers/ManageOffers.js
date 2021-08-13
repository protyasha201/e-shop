import axios from "axios";
import React from "react";
import { useState } from "react";

const ManageOffers = () => {
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [offers, setOffers] = useState({
    offerImageUrl: "",
  });

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
    axios
      .post("http://localhost:5000/addOffer", offers)
      .then(function (response) {
        setIsImageUploaded("");
        alert("Offer Added Successfully");
      })
      .catch(function (error) {});
  };

  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">Manage Offers</h1>
      <form
        onSubmit={addOffer}
        className="border rounded flex flex-col w-full mt-3 sm:w-2/4 shadow-md p-5 md:w-2/5"
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
            className="shadow-md border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1 cursor-pointer hover:bg-blue-300"
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
          className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:border-transparent"
          value="Add Offer"
        />
      </form>
    </section>
  );
};

export default ManageOffers;
