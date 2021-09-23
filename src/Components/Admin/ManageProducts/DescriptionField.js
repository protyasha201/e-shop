import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const DescriptionField = (props) => {
  const {
    name,
    data,
    fieldName,
    handleDataChange,
    inputName,
    setFieldName,
    cancelChange,
  } = props;

  const cancelEdit = () => {
    cancelChange(true, inputName);
    setFieldName(!fieldName);
  };

  return (
    <div className="flex mt-2 justify-between">
      <h3 className="text-gray-500 montserrat font-bold w-full text-sm">
        <span className="text-gray-400">{name}: </span>
        {fieldName ? (
          <textarea
            name={inputName}
            className="w-full h-40 p-1 shadow border rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-bold"
            type="text"
            onChange={handleDataChange}
            defaultValue={data}
          />
        ) : (
          data
        )}
      </h3>
      {fieldName ? (
        <CancelIcon
          className="shadow text-blue-500 rounded cursor-pointer hover:text-red-600 ml-2"
          onClick={cancelEdit}
        />
      ) : (
        <EditIcon
          onClick={() => setFieldName(!fieldName)}
          className="shadow text-white rounded bg-red-400 cursor-pointer hover:bg-blue-400 ml-2"
        />
      )}
    </div>
  );
};

export default DescriptionField;
