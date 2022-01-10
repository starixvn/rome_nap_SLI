import React from 'react';
import { Table } from 'reactstrap';

const Page = () => {
  return (
    <Table bordered striped hover>
      <thead>
        <tr className="text-center">
          <th className="col-ko-time">Kick Off. Time</th>
          <th className="col-match">Match</th>
          <th className="col-oeft">FT.O/E</th>
          <th className="col-1st-ball">1st Ball</th>
          <th className="col-2nd-ball">2nd Ball</th>
          <th className="col-3rd-ball">3rd Ball</th>
          <th className="col-status">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center" colSpan={7}>
            There is no information
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Page;
