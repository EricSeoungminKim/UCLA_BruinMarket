import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import Dropdown from "react-bootstrap/Dropdown";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

export default function AboutUsDropDown() {
  return (
    <div>
      <Dropdown title="GeeksforGeeks">
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Menu title="SubMenu">
          <Dropdown.Item>Item 2A</Dropdown.Item>
          <Dropdown.Item>Item 2B</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
