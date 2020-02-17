import React from "react";
import DicomList from "./DicomList";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
  
function App() {
  return (
      <>
        <Header />    
          <DicomList />
        <Footer />
      </>
  );
}

export default App;
