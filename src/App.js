import React from "react";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes";
// import ToggleTheme from "./components/ToggleTheme";
import { Auth } from "aws-amplify";

function App() {
  const [signedIn, setSignedIn] = React.useState(undefined);

  React.useEffect(() => {
    (async function () {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setSignedIn(user);
      } catch (error) {
        setSignedIn(undefined);
        console.log("use effect log", error);
      }
    })();
  }, []);
  console.log("here is signed in state", signedIn);
  return (
    <div>
      {/* <PublicRoutes /> */}
      {signedIn ? (
        <>
          {/* <Navbar setSignedIn={setSignedIn} /> */}
          <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} />
          {/* <div>HELLOOOOOO</div> */}
        </>
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
