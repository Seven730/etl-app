import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

function Data({ carsArray }: any) {
  console.log(carsArray);

  return (
    <tbody>
      {carsArray.map((car: any) => (
        <tr>
          <td>{car}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <Button className="data--button" variant="light">
              <CSVLink data={car.toString()}>Download</CSVLink>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Data;
