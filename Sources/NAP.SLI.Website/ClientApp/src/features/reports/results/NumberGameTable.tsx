import React from 'react';
import { Table } from 'reactstrap';

const NumberGameTable = () => {
  return (
    <Table bordered>
      <thead>
        <tr className="text-center">
          <th>Kick Off. Time</th>
          <th>Match</th>
          <th>Result</th>
          <th>Warrior</th>
          <th>O/E FT</th>
          <th>1st Ball</th>
          <th>Last Ball</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={8}>Number Game</td>
        </tr>
        {/* <tr>
          <td className="text-center" colSpan={8}>
            There is no information
          </td>
        </tr> */}
        <tr>
          <td>12/04/2019 12:00:00 AM</td>
          <td>Number Game No 01019</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default NumberGameTable;
