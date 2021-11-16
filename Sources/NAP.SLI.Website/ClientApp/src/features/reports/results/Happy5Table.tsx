import React from 'react';
import { Table } from 'reactstrap';

const Happy5Table = () => {
  return (
    <Table bordered>
      <thead>
        <tr className="text-center">
          <th>Kick Off. Time</th>
          <th>Match</th>
          <th>Result</th>
          <th>Total</th>
          <th>B/S</th>
          <th>O/E</th>
          <th>4S</th>
          <th>MO/ME</th>
          <th>CB</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={8}>Number Game</td>
        </tr>
        <tr>
          <td>12/04/2019 12:00:00 AM</td>
          <td>Happy 5</td>
          <td></td>
          <td></td>
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

export default Happy5Table;
