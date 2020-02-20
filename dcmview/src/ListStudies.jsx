import React from "react";
import logo from "./logo.png";
import "./App.css";

// Study display header
function ListStudies() {
  return (
    <>
    <div className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container d-flex justify-content-between">
        <div className="titlebox navbar-brand d-flex align-items-center">
          <img src={logo} className="logo" alt="logo"></img>
          Study explorer
        </div>
      </div>
    </div>
    <div className="jumbotron text-center shadow-sm">
      <div className="container">
        <h2>List of studies</h2>
        <p className="lead text-muted">Click on files to explore...</p>
      </div>
    </div>
    </>
  );
}

export default ListStudies;