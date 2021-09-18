import { useEffect } from "react";
import { useState } from "react";
import Header from "../Header/Header";
import Products from "./Products/Products";
import Offers from "./Offers/Offers";
import Footer from "./Footer/Footer";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/allProductsByCategory`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setProducts(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch(`http://localhost:5000/offers`)
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setOffers(result);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <Header />
      {offers !== undefined &&
      offers.length > 0 &&
      products !== undefined &&
      products.length > 0 ? (
        <div>
          <Offers />
          <Products />
          <Footer />
        </div>
      ) : (
        <h1 className="text-center text-xl montserrat font-bold text-gray-600 mt-80">
          Loading...
        </h1>
      )}
    </section>
  );
};

export default Home;
