import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatInteger, formatDecimal } from 'utils/NumberUtils';
import { CustomerLevels, isUplineOrSameLevel } from 'utils/CustomerLevelUtils';
import { ReportType } from './reducer';

// eslint-disable-next-line sonarjs/cognitive-complexity
const TableComponent = () => {
  const { queryData, queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );

  if (!queryData || !queryCustomer) {
    return <></>;
  }

  const { records, total } = queryData;
  const { roleId } = queryCustomer;
  const { reportType } = queryArg;

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

  const getReportName = (reportType: ReportType) => {
    return reportType === ReportType.Sport
      ? 'Sport'
      : reportType == ReportType.Monthly
      ? 'Monthly'
      : 'Daily';
  };

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>
            {getReportName(reportType)}
          </th>
          <th className="text-center align-middle" rowSpan={2}>
            Bet Count
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
        {records.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8 - removedColumnTotal}>
              There is no information
            </td>
          </tr>
        ) : (
          records.map((record) => (
            <tr key={record.rollupKey}>
              <td>
                <span className="text-right">{record.rollupKey}</span>
              </td>

              <td className="text-right">{formatInteger(record.betCount)}</td>
              <td className="text-right">{formatDecimal(record.turnover)}</td>
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
          ))
        )}
      </tbody>
      {records.length > 0 && total && (
        <tfoot>
          <tr>
            <td>Total</td>
            <td className="text-right">{formatInteger(total.betCount)}</td>
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
