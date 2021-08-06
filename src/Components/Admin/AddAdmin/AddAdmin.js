import React from "react";

const AddAdmin = () => {
  const handleAddAdmin = (e) => {
    e.preventDefault();
    alert("Admin Added");
  };
  return (
    <section className="border-2 rounded p-2 md:w-11/12 m-auto">
      <h1 className="text-green-400 text-xl text-left">
        Admins<span className="text-black">/</span>Add Admin
      </h1>
      <form
        onSubmit={handleAddAdmin}
        className="border rounded flex flex-col w-full mt-3 sm:w-2/4 shadow-md p-5 md:w-2/5"
      >
        <input
          required
          name="adminEmail"
          type="email"
          className="shadow-md border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent p-3 sm:p-1"
          placeholder="admin@gmail.com"
        />
        <input
          type="submit"
          className="mt-4 h-10 bg-green-400 rounded cursor-pointer text-white font-bold montserrat text-xl focus:outline-none focus:ring-2 focus:border-transparent"
          value="Add new Admin"
        />
      </form>
      <h3 className="font-bold text-lg mt-3 montserrat text-gray-500">
        All Admins
      </h3>
    </section>
  );
};

export default AddAdmin;
