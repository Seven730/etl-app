import React from "react";
import { Button } from "react-bootstrap";

export default function Data(cars: any) {
  const carsArray = Object.values(cars)[0];
  console.log(carsArray);
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>
        <Button className="data--button" variant="light">
          Download
        </Button>
      </td>
    </tr>
  );

  //   return carsArray.map((car: any) => {
  //     const { ... } = car
  //     return (
  //       <tr>
  //         <td>1</td>
  //         <td>Mark</td>
  //         <td>Otto</td>
  //         <td>@mdo</td>
  //         <td>
  //           <Button className="data--button" variant="light">
  //             Download
  //           </Button>
  //         </td>
  //       </tr>
  //     );
  //   });
}
