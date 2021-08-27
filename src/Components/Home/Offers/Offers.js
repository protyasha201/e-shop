import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

function Offers(props) {
  const [offers, setOffers] = useState([]);
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

  return (
    <Carousel animation="slide" interval={4000}>
      {offers.map((offer, i) => (
        <Item key={i} offer={offer} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper className="w-full h-80 md:w-11/12 md:m-auto md:mt-5 rounded border">
      <img
        className="w-full h-full rounded"
        alt={props.offerImageUrl}
        src={props.offer.offerImageUrl}
      />
    </Paper>
  );
}

export default Offers;
