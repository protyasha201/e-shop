import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  let count = 0;
  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:5000/offers")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setOffers(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const images = offers.map((eachOffer) => eachOffer.offerImageUrl);

  const [currentOffer, setCurrentOffer] = useState();

  const changeOfferImage = () => {
    if (count >= images.length) {
      count = 0;
      setCurrentOffer(images[count]);
    } else {
      setCurrentOffer(images[count]);
      count++;
    }
  };

  useEffect(() => {
    let isMounted = true;
    setInterval(() => {
      if (isMounted) {
        changeOfferImage();
      }
    }, 4000);
    return () => {
      isMounted = false;
    };
  });

  return (
    <section className="w-full h-80 md:w-11/12 md:m-auto md:mt-5 rounded border">
      <img
        className="w-full h-full rounded"
        src={currentOffer}
        alt={currentOffer}
      />
    </section>
  );
};

export default Offers;
