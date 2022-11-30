import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function Search() {
  const [selectedCategory, setSelectedCategory] = useState("Show All");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <React.Fragment>
      <div className="controlArea">
        <div className="searchBox">
          <Form.Label htmlFor="inputSearchBar">Search</Form.Label>
          <Form.Control type="text" aria-describedby="passwordHelpBlock" />
          <Form.Text>
            Search for certain USERNAME / DESCRIPTION of an item
          </Form.Text>
        </div>
        <div className="filterBox">
          <label>Category</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleCategoryChange}
          >
            <option value="Show All">Show All</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </Form.Select>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;
