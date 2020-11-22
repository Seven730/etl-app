import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

function Data(data: any) {
  console.log("Data in mapping component", data.data);
  return (
    <tbody>
      {data.data.forEach((item: any) => (
        <tr>
          <td>{item.code}</td>
          <td>{item.currency}</td>
          <td>{item.mid}</td>
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
