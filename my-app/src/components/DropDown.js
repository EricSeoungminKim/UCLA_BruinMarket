import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function DropDown() {
  return (
    <div>
      <Dropdown className="dropdownMenu">
        <Dropdown.Toggle variant="success"></Dropdown.Toggle>
      </Dropdown>
    </div>
  );
}
