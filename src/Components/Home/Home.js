import { useEffect } from "react";
import { useState } from "react";
import Header from "../Header/Header";
import Products from "./Products/Products";
import Offers from "./Offers/Offers";
import Footer from "./Footer/Footer";
const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <section>
      <Header />
      {products.length > 0 ? (
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
