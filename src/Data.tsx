import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

function Data({ dataArray }: any) {
  console.log(dataArray);

  return (
    <tbody>
      {dataArray.map((item: any) => (
        <tr>
          <td>{item}</td>
          <td></td>
          <td></td>
          <td>
            <Button className="data--button" variant="light">
              <CSVLink data={item.toString()}>Download</CSVLink>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Data;
