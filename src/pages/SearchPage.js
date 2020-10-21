import React from "react";
import axios from "axios";
import DisplayComponent from "../components/DisplayComponent";

export default function SearchPage({ search, signedIn }) {
  const [searchComps, setSearchComps] = React.useState([]);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const results = await axios.post("http://localhost:4000/search", {
          token,
          search,
        });
        setSearchComps(results.data);
      } catch (error) {}
    })();
  }, []);
  console.log("search comps", searchComps);
  return (
    <div>
      {searchComps[0] ? (
        searchComps.map((comp) => <DisplayComponent component={comp} />)
      ) : (
        <div>Sorry, none found</div>
      )}
    </div>
  );
}
