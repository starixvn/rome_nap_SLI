import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatInteger, formatDecimal } from '../../../common/utils/NumberUtils';

const MasterList = () => {
  const { data } = useSelector(state => state.winLossDetail);
  const { records } = data;

  const renderTableBody = () => {
    if (records.length === 0) {
      return (
        <tr>
          <td className="text-center" colSpan='8'>
            There is no information
          </td>
        </tr>
      );
    }

    return (
      <>
        {records.map(record =>
          <tr key={`Row_${record.custId}`}>
            <td>
              <span className="text-link" onClick={() => dispatch(handleUsernameClicked({ record }))}>{record.username}</span>
            </td>
            <td className="text-right">
              {formatInteger(record.betCount)}
            </td>
            <td className="text-right">
              {formatDecimal(record.turnover)}
            </td>
            <td className="text-right">
              {formatDecimal(record.memberWinLoss)}
            </td>
            <td className="text-right">
              {formatDecimal(record.agentWinLoss)}
            </td>
            <td className="text-right">
              {formatDecimal(record.masterWinLoss)}
            </td>
            <td className="text-right">
              {formatDecimal(record.superWinLoss)}
            </td>
            <td className="text-right">
              {formatDecimal(record.companyWinLoss)}
            </td>
          </tr>
        )}
      </>
    );
  };

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan='2'>Username</th>
          <th className="text-center align-middle" rowSpan='2'>Bet Count</th>
          <th className="text-center align-middle" rowSpan='2'>Turnover</th>
          <th className="text-center" colSpan='5'>Win/Loss</th>
        </tr>
        <tr>
          <th className="text-center">Member</th>
          <th className="text-center">Agent</th>
          <th className="text-center">Master</th>
          <th className="text-center">Super</th>
          <th className="text-center">Company</th>
        </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </Table>
  );
}

export default MasterList;