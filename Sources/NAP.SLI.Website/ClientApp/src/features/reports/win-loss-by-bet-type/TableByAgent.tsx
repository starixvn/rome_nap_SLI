import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';
import { Record } from './reducer';

type RowProps = {
  record: Record;
  isFooter: boolean;
};

const RowComponent = ({ record, isFooter }: RowProps) => {
  return (
    <tr>
      <td>{isFooter ? 'Total' : record.betTypeName}</td>
      <td className="text-right">{formatInteger(record.betCount)}</td>
      <td className="text-right">{formatDecimal(record.turnover)}</td>
      <td className="text-right">{formatDecimal(record.memberWinLoss)}</td>
      <td className="text-right">{formatDecimal(record.agentWinLoss)}</td>
      <td className="text-right">{formatDecimal(record.companyWinLoss)}</td>
    </tr>
  );
};

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
          <th className="text-center" colSpan={3}>
            Win/Loss
          </th>
        </tr>
        <tr>
          <th className="text-center">Member</th>
          <th className="text-center">Agent</th>
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
            <RowComponent
              key={`record_${record.betType}`}
              record={record}
              isFooter={false}
            />
          ))
        )}
      </tbody>
      {records.length > 0 && (
        <tfoot>
          <RowComponent record={total} isFooter={true} />
        </tfoot>
      )}
    </Table>
  );
};

export default TableComponent;
