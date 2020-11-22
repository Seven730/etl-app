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
  const [data, setData] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [isTransformed, setIsTransformed] = useState<boolean>(false);

  let dataArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "K"];
  let dataArrayCSV = dataArray;

  const indexofLastItem = currentPage * rowsPerPage;
  const indexofFirstItem = indexofLastItem - rowsPerPage;
  let currentData = dataArray.slice(indexofFirstItem, indexofLastItem);

  const handleETL = () => {
    handleExtract();
    handleTransform();
    handleLoad();
  };

  const handleExtract = async (): Promise<any> => {
    setLoading(true);
    await axios
      .get("http://api.nbp.pl/api/exchangerates/tables/B/")
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log("Data in Extract: ", data)
      });
  };

  const handleTransform =  (): void => {
    if (data) {
      setIsTransformed(true);
      setData(Array.from(data.data[0].rates))
      currentData = dataArray.slice(indexofFirstItem, indexofLastItem)
    }
    else {
      alert("Extract data first")
    }
  };

  const handleLoad = async (): Promise<any> => {
    console.log("Data in Loading: ", data)
    await axios.post("", { data });
  };

  const handleClearDB = async (): Promise<any> => {
    setData(undefined);
    setIsTransformed(false);
    await axios.post("", { data });
  };

  let items: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {

  }
  for (
    let number = 1;
    number <= Math.ceil(dataArray.length / rowsPerPage);
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
// IT WAS ME ALL ALONG LUKE
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
            <CSVLink data={dataArrayCSV.toString()} className="app--CSV">
              Export to .csv
            </CSVLink>
          </Button>
        </Container>
        {data && isTransformed ? (
          <Container>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Currency</th>
                  <th>Exchange rate</th>
                  <th>Export (.csv)</th>
                </tr>
              </thead>
              <Data data={data && isTransformed ? data : []} />
            </Table>
            <Pagination>{items}</Pagination>
          </Container>
        ) : data && !isTransformed ? (
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
