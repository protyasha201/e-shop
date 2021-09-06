import { Modal } from "@material-ui/core";
import React, { useState } from "react";

const ModalAlert = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
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
  );
};

export default ModalAlert;
