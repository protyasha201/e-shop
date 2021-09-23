import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const EditingField = (props) => {
  const {
    name,
    data,
    fieldName,
    handleDataChange,
    inputName,
    setFieldName,
    cancelChange,
    required,
  } = props;

  const cancelEdit = () => {
    cancelChange(true, inputName);
    setFieldName(!fieldName);
  };

  return (
    <div className="flex mt-2 justify-between">
      <h3 className="text-gray-500 montserrat font-bold text-sm">
        <span className="text-gray-400">{name}: </span>
        {fieldName ? (
          <input
            required={required === true ? required : false}
            name={inputName}
            className="p-1 shadow border rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-bold"
            type="text"
            onChange={handleDataChange}
            defaultValue={data}
            id="inputField"
          />
        ) : (
          <span>{data !== "" ? data : "not set yet"}</span>
        )}
      </h3>
      {fieldName ? (
        <CancelIcon
          onClick={cancelEdit}
          className="shadow text-red-500 rounded cursor-pointer ml-2"
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
