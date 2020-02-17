import React from "react";
import logo from "./logo.png";
import "./App.css";

// App Header
function Header() {
  return (
    <>
    <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <div className="titlebox navbar-brand d-flex align-items-center">
          <img src={logo} className="logo" alt="logo"></img>
          Study Pannel
        </div>
      </div>
    </div>
    <section className="jumbotron text-center">
      <div className="container">
        <h2>List of studies</h2>
        <p className="lead text-muted">Click on files to explore...</p>
      </div>
    </section>
    </>
  );
}

export default Header;