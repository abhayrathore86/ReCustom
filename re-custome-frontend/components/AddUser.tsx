'use client';

import { useState } from "react";
import Modal from "./Modal";
import UserForm from "./UserForm/UserForm";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={handleCloseModal}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add User
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UserForm handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AddUser;
