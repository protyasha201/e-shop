import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const OfferDetails = () => {
  const { id } = useParams();
  let history = useHistory();
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    fetch(`http://localhost:5000/offerDetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isUnmounted) {
          setOfferData(data[0]);
        }
      });

    return () => {
      isUnmounted = true;
    };
  }, [id]);

  const goToAdmin = () => {
    history.push("/admin");
  };

  const deleteOffer = () => {
    fetch(`http://localhost:5000/deleteOffer/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        history.push("/admin");
      });
  };

  return (
    <section className="p-5">
      <div className="p-2 flex justify-between items-center md:w-4/5 md:m-auto lg:w-3/5">
        <h1 className="text-green-400 text-xl text-left">Offer Details</h1>
        <button
          onClick={goToAdmin}
          className="shadow-md p-2 bg-green-400 rounded condensed text-white"
        >
          Back To Admin
        </button>
      </div>
      {offerData.length === 0 ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="p-3 flex flex-col sm:flex-row justify-between md:w-4/5 md:m-auto border lg:w-3/5 sm:items-center">
          <div className="w-full sm:w-4/5">
            {offerData.offerImageUrl ? (
              <img
                className="w-full rounded border"
                alt={offerData._id}
                src={offerData.offerImageUrl}
              />
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <button
            onClick={deleteOffer}
            className="mt-3 clear-both float-right border p-2 rounded text-white bg-red-500 condensed"
          >
            Delete Offer
          </button>
        </div>
      )}
    </section>
  );
};

export default OfferDetails;
