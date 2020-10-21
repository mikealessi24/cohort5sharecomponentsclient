import React from "react";
import { navigate } from "@reach/router";

export default function SearchBar() {
  const [search, setSearch] = React.useState("");
  async function searchComps() {
    navigate(`/search/${search}`);
  }
  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => searchComps()}>Search</button>
    </div>
  );
}
