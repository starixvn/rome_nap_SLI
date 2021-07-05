import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';

const TableComponent = () => {
  const { queryData, queryCustomer } = useSelector(
    (state: AppState) => state.winLossByBetType,
  );

  if (!queryData || !queryCustomer) {
    return <></>;
  }

  const { records, total } = queryData;

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>
            Bet Type
          </th>
          <th className="text-center align-middle" rowSpan={2}>
            No. of Ticket
          </th>
          <th className="text-center align-middle" rowSpan={2}>
            Turnover
          </th>
          <th className="text-center align-middle" rowSpan={2}>
            Agent Total
          </th>
          <th className="text-center" colSpan={2}>
            Win/Loss
          </th>
        </tr>
        <tr>
          <th className="text-center">Master</th>
          <th className="text-center">Company</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={7}>
              There is no information
            </td>
          </tr>
        ) : (
          records.map((record) => (
            <tr key={record.betTypeName}>
              <td>{record.betTypeName}</td>
              <td className="text-right">{formatInteger(record.betCount)}</td>
              <td className="text-right">{formatDecimal(record.turnover)}</td>
              <td className="text-right">{formatDecimal(record.agentTotal)}</td>
              <td className="text-right">
                {formatDecimal(record.masterWinLoss)}
              </td>
              <td className="text-right">
                {formatDecimal(record.companyWinLoss)}
              </td>
            </tr>
          ))
        )}
      </tbody>
      {records.length > 0 && (
        <tfoot>
          <tr>
            <td>Total</td>
            <td className="text-right">{formatInteger(total.betCount)}</td>
            <td className="text-right">{formatDecimal(total.turnover)}</td>
            <td className="text-right">{formatDecimal(total.agentTotal)}</td>
            <td className="text-right">{formatDecimal(total.masterWinLoss)}</td>
            <td className="text-right">
              {formatDecimal(total.companyWinLoss)}
            </td>
          </tr>
        </tfoot>
      )}
    </Table>
  );
};

export default TableComponent;
