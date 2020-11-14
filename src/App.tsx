import React, { useState } from "react";
import "./App.scss";
import { Jumbotron, Container, Button, Table } from "react-bootstrap";
import Data from "./Data";
import axios from "axios";

function App(): JSX.Element {
  const [cars, setCars] = useState<undefined | Object>();

  const handleETL = () => {
    handleExtract();
    handleTransform();
    handleLoad();
  };

  const handleExtract = (): void => {
    axios(
      "http://cors-anywhere.herokuapp.com/http://api.cepik.gov.pl/pojazdy?wojewodztwo=30&data-od=20190101&data-do=20191231"
    ).then((data) => setCars(data));
  };

  const handleTransform = () => {};

  const handleLoad = () => {
    fetch("", {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify(cars),
    });
  };

  const handleClearDB = (): void => {
    setCars(undefined);
    fetch("", {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: JSON.stringify(cars),
    });
  };

  const handleExport = () => {};

  return (
    <div className="app">
      <div className="app__container">
        <Jumbotron fluid>
          <Container>
            <h1>ETL Application</h1>
            <p>Extract - Transform - Load</p>
          </Container>
        </Jumbotron>
        <Container className="app__buttons">
          <Button variant="primary" onClick={handleETL}>
            ETL
          </Button>
          <Button variant="primary" onClick={handleExtract}>
            Extract only
          </Button>
          <Button variant="primary" onClick={handleTransform}>
            Transform only
          </Button>
          <Button variant="primary" onClick={handleLoad}>
            Load only
          </Button>
          <Button variant="primary" onClick={handleClearDB}>
            Clear Database
          </Button>
          <Button variant="primary" onClick={handleExport}>
            Export to .csv
          </Button>
        </Container>
        <Container>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {cars ? (
                <Data cars={cars} />
              ) : (
                <tr>
                  <td>No data</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default App;
