import React from "react";
import { Button } from "react-bootstrap";
import logo from "./logo.png";
import "./App.css";

// Series display header
function ListSeries({ setSeriesMode }) {
    return (
    <>
    <div className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container d-flex justify-content-between">
        <div className="titlebox navbar-brand d-flex align-items-center">
          <img src={logo} className="logo" alt="logo"></img>
          Serie explorer
        </div>
        <Button className="btn-outline-secondary" onClick={setSeriesMode}>Go back</Button>
      </div>
    </div>
    <div className="jumbotron text-center">
      <div className="container">
        <h2>List of series</h2>
        <p className="lead text-muted">Click on files to explore...</p>
      </div>
    </div>
    </>
  );
}

export default ListSeries;