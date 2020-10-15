import React from 'react';
import logo from './logo.svg';
import './App.css';
import PublicRoutes from './components/PublicRoutes';

function App() {
  const [signedIn, setSignedIn] = React.useState(undefined);
  return (
    <div className="App">
      {/* <PublicRoutes /> */}
      {signedIn ? (
        <>
          {/* <Navbar setSignedIn={setSignedIn} />
          <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} /> */}
          <div>HELLOOOOOO</div>
        </>
      ) : (
        <PublicRoutes setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;
