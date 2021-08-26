import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const EditingField = (props) => {
  const { name, data, fieldName, handleDataChange, inputName, setFieldName } =
    props;

  return (
    <div className="flex mt-2 justify-between">
      <h3 className="text-gray-500 montserrat font-bold">
        <span className="text-gray-400">{name}: </span>
        {fieldName ? (
          <input
            name={inputName}
            className="p-1 shadow border rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-bold"
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
          onClick={() => setFieldName(!fieldName)}
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

export default EditingField;
