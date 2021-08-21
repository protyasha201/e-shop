import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../../images/others/e-shop-logo.png";

const Footer = () => {
  return (
    <section className="mt-5 border p-3 bg-gray-900 text-gray-400">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-gray-400 montserrat text-2xl font-bold">
            We Try To Make Your Life Easy
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 montserrat text-2xl font-bold">
              We are here as
            </p>
            <img className="h-20 rounded w-1/2" src={logo} alt="e-shop" />
          </div>
        </div>
        <div className="mt-5">
          <p className="montserrat">Stay connected with us in</p>
          <div className="w-1/2 flex justify-between p-3">
            <a target="blank_" href="https://facebook.com">
              <FontAwesomeIcon
                className="hover:text-blue-600 text-4xl cursor-pointer"
                icon={faFacebook}
              />
            </a>
            <a target="blank_" href="https://twitter.com">
              <FontAwesomeIcon
                className="hover:text-blue-400 text-4xl cursor-pointer"
                icon={faTwitter}
              />
            </a>
            <a target="blank_" href="https://instagram.com">
              <FontAwesomeIcon
                className="hover:text-red-400 text-4xl cursor-pointer"
                icon={faInstagram}
              />
            </a>
            <a target="blank_" href="https://youtube.com">
              <FontAwesomeIcon
                className="hover:text-red-600 text-4xl cursor-pointer"
                icon={faYoutube}
              />
            </a>
          </div>
        </div>
        <div>
          <h1>3rd</h1>
        </div>
        <div>
          <h1>4th</h1>
        </div>
      </div>
    </section>
  );
};

export default Footer;
