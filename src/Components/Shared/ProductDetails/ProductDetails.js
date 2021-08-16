import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <section>
      <h1>{id}</h1>
    </section>
  );
};

export default ProductDetails;
