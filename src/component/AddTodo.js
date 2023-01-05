import React from "react";
import "./todo.css";
const AddTodo = ({ onAdd }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.name.value);
    e.target.name.value = "";
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder="Please enter here"
          name="name"
          required
          className="input"
        />
        <button
          variant="contained"
          sx={{ flexFlow: 4, p: 0.9, m: 0.2, width: "10%" }}
          onSubmit={handleOnSubmit}
          size="large"
          className="button"
        >
          Save
        </button>
        <hr />
      </form>
    </div>
  );
};

export default AddTodo;
