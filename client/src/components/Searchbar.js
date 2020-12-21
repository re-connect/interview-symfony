import React from "react";

export default function Searchbar({ updateSearch }) {
  return (
    <form className="form search-bar" onChange={(e) => updateSearch(e)}>
      <label htmlFor="searchbar">Rechercher:</label>
      <input type="text" name="searchbar" id="searchbar" />
    </form>
  );
}
