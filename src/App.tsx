import React, { useState } from "react";
import "./App.scss";
import {
  Jumbotron,
  Container,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import Data from "./Data";
import axios from "axios";
import { CSVLink } from "react-csv";

function App(): JSX.Element {
  const [cars, setCars] = useState<undefined | Object>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage: number = 10;
  const [isTransformed, setIsTransformed] = useState<boolean>(false);

  let carsArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "K"];
  let carsArrayCSV = carsArray;

  const indexOfLastCar = currentPage * rowsPerPage;
  const indexOfFirstCar = indexOfLastCar - rowsPerPage;
  const currentCars = carsArray.slice(indexOfFirstCar, indexOfLastCar);

  const handleETL = () => {
    handleExtract();
    handleTransform();
    handleLoad();
  };

  const handleExtract = async (): Promise<any> => {
    setLoading(true);
    await axios
      .get("https://api.github.com/users/Seven730/repos")
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  };

  const handleTransform = (): void => {
    setIsTransformed(true);
  };

  const handleLoad = async (): Promise<any> => {
    await axios.post("", { cars });
  };

  const handleClearDB = async (): Promise<any> => {
    setCars(undefined);
    setIsTransformed(false);
    await axios.post("", { cars });
  };

  let items: JSX.Element[] = [];
  for (
    let number = 1;
    number <= Math.ceil(carsArray.length / rowsPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={(): void => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

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
          <Button variant="primary">
            <CSVLink data={carsArrayCSV.toString()} className="app--CSV">
              Export to .csv
            </CSVLink>
          </Button>
        </Container>
        {cars && isTransformed ? (
          <Container>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Export (.csv)</th>
                </tr>
              </thead>
              <Data carsArray={currentCars} />
            </Table>
            <Pagination>{items}</Pagination>
          </Container>
        ) : cars && !isTransformed ? (
          <h2 className="data--info">Data needs to be transformed</h2>
        ) : loading ? (
          <h2 className="data--info">Loading...</h2>
        ) : (
          <h2 className="data--info">No data</h2>
        )}

        <footer className="data--footer">
          Copyright © {new Date().getFullYear()} Joanna Wojtowicz, Michał
          Wojcieszak, Jacek Wyroba
        </footer>
      </div>
    </div>
  );
}

export default App;
