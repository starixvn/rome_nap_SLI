import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import { CustomerLevels, isUplineOrSameLevel } from 'utils/CustomerLevelUtils';

// eslint-disable-next-line sonarjs/cognitive-complexity
const TableComponent = () => {
  const { queryData, queryCustomer } = useSelector(
    (state: AppState) => state.matchWinLossDetail,
  );

  if (!queryData || !queryCustomer) {
    return <></>;
  }

  const { matches, total } = queryData;
  const { roleId } = queryCustomer;

  const getRemovedColumnTotal = () => {
    switch (roleId) {
      case CustomerLevels.Master:
        return 1;
      case CustomerLevels.Agent:
        return 2;
      default:
        return 0;
    }
  };

  const removedColumnTotal = getRemovedColumnTotal();

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>
            Bet Type
          </th>
          <th className="text-center align-middle" rowSpan={2}>
            Turnover
          </th>
          <th className="text-center" colSpan={5 - removedColumnTotal}>
            Win/Loss
          </th>
        </tr>
        <tr>
          <th className="text-center">Member</th>
          <th className="text-center">Agent</th>
          {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
            <th className="text-center">Master</th>
          )}
          {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
            <th className="text-center">Super</th>
          )}
          {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
            <th className="text-center">Company</th>
          )}
        </tr>
      </thead>
      <tbody>
        {matches.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={7 - removedColumnTotal}>
              There is no information
            </td>
          </tr>
        ) : (
          matches.map(
            (match) => (
              match.records.map((record) => (
                <tr key={match.matchName}>
                  <td>{record.betTypeName}</td>
                  <td className="text-right">
                    {formatDecimal(record.turnover)}
                  </td>
                  <td className="text-right">
                    {formatDecimal(record.memberWinLoss)}
                  </td>
                  <td className="text-right">
                    {formatDecimal(record.agentWinLoss)}
                  </td>
                  {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
                    <td className="text-right">
                      {formatDecimal(record.masterWinLoss)}
                    </td>
                  )}
                  {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                    <td className="text-right">
                      {formatDecimal(record.superWinLoss)}
                    </td>
                  )}
                  {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                    <td className="text-right">
                      {formatDecimal(record.companyWinLoss)}
                    </td>
                  )}
                </tr>
              )),
              (
                <tr>
                  <td>Sub Total</td>
                  <td className="text-right">
                    {formatDecimal(match.total.turnover)}
                  </td>
                  <td className="text-right">
                    {formatDecimal(match.total.memberWinLoss)}
                  </td>
                  <td className="text-right">
                    {formatDecimal(match.total.agentWinLoss)}
                  </td>
                  {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
                    <td className="text-right">
                      {formatDecimal(match.total.masterWinLoss)}
                    </td>
                  )}
                  {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                    <td className="text-right">
                      {formatDecimal(match.total.superWinLoss)}
                    </td>
                  )}
                  {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                    <td className="text-right">
                      {formatDecimal(match.total.companyWinLoss)}
                    </td>
                  )}
                </tr>
              )
            ),
          )
        )}
      </tbody>
      {matches.length > 0 && total && (
        <tfoot>
          <tr>
            <td>Total</td>
            <td className="text-right">{formatDecimal(total.turnover)}</td>
            <td className="text-right">{formatDecimal(total.memberWinLoss)}</td>
            <td className="text-right">{formatDecimal(total.agentWinLoss)}</td>
            {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
              <td className="text-right">
                {formatDecimal(total.masterWinLoss)}
              </td>
            )}
            {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
              <td className="text-right">
                {formatDecimal(total.superWinLoss)}
              </td>
            )}
            {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
              <td className="text-right">
                {formatDecimal(total.companyWinLoss)}
              </td>
            )}
          </tr>
        </tfoot>
      )}
    </Table>
  );
};

export default TableComponent;
