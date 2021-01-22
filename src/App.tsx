import React, { useState } from "react";
import "./App.scss";
import { Jumbotron, Container, Button } from "react-bootstrap";
import axios from "axios";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";

function App(): JSX.Element {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isTransformed, setIsTransformed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [dataCSV, setDataCSV] = useState<any>([]);

  const columns = [
    {
      name: "Code",
      selector: "code",
      sortable: true,
    },
    {
      name: "Currency",
      selector: "currency",
      sortable: true,
    },
    {
      name: "Exchange rate",
      selector: "mid",
      sortable: true,
    },
  ];

  const handleExtract = async (): Promise<any> => {
    setLoading(true);
    setIsTransformed(false);
    setIsLoaded(false);
    await axios
      .get("http://api.nbp.pl/api/exchangerates/tables/A/today/")
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  const handleTransform = (): void => {
    if (data && !isTransformed) {
      setIsTransformed(true);
      console.log(data);
      setData(Array.from(data.data[0].rates));
    } else {
      alert("Extract data first");
    }
  };

  const handleLoad = (): void => {
    if (isTransformed && !isLoaded) {
      setDataCSV(data);
      setIsLoaded(true);
    } else {
      alert("Transform data first");
    }
  };

  const handleClearDB = (): void => {
    setData(undefined);
    setIsTransformed(false);
    setIsLoaded(false);
  };

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
          <Button variant="primary" onClick={handleExtract}>
            Extract
          </Button>
          <Button variant="primary" onClick={handleTransform}>
            Transform
          </Button>
          <Button variant="primary" onClick={handleLoad}>
            Load
          </Button>
          <Button variant="primary" onClick={handleClearDB}>
            Clear DB
          </Button>
          <Button variant="primary">
            <CSVLink
              data={dataCSV && !dataCSV.config ? dataCSV : []}
              className="app--CSV">
              Export data to .csv
            </CSVLink>
          </Button>
        </Container>
        {data && isTransformed ? (
          <Container>
            <DataTable
              title={`Exchange Rates - ${new Date()
                .toJSON()
                .slice(0, 10)
                .replace(/-/g, "/")}`}
              columns={columns}
              data={data}
              defaultSortFieldId="code"
              pagination
            />
          </Container>
        ) : data && !isTransformed ? (
          <h2 className="data data__info">Data needs to be transformed</h2>
        ) : loading ? (
          <h2 className="data data__info">Loading...</h2>
        ) : (
          <h2 className="data data__info">No data</h2>
        )}
      </div>
    </div>
  );
}

export default App;
