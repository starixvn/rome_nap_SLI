import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatInteger, formatDecimal } from 'utils/NumberUtils';
import { CustomerLevels, isUplineOrSameLevel } from 'utils/CustomerLevelUtils';
import { ReportType } from './reducer';
import { formatDate } from 'utils/DateUtils';
import { Moment } from 'moment';

// eslint-disable-next-line sonarjs/cognitive-complexity
const TableComponent = () => {
  const { data, customer, reportType, fromDate, toDate } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );

  if (!data || !customer) {
    return <></>;
  }

  const { roleId } = customer;
  const { records, total } = data;
  const removedColumnTotal =
    roleId === CustomerLevels.Master
      ? 2
      : roleId === CustomerLevels.Agent
      ? 3
      : 0;

  const reportHeaderColumn =
    reportType == ReportType.Sport
      ? 'Sport'
      : reportType == ReportType.Monthly
      ? 'Monthly'
      : 'Daily';
  const getReportHeader = (
    reportType: number,
    fromDate: Moment,
    toDate: Moment,
  ) => {
    let headerTile = '';
    if (reportType == ReportType.Daily) {
      headerTile += 'Daily Winloss Analysis';
    } else if (reportType == ReportType.Monthly) {
      headerTile += 'Monthly Winloss Analysis';
    } else if (reportType == ReportType.Sport) {
      headerTile += 'Sport Winloss Analysis';
    } else {
      return headerTile;
    }

    headerTile += ` ${formatDate(fromDate)} ---> ${formatDate(toDate)}`;
  };

  return (
    <>
      <p>{getReportHeader(reportType, fromDate, toDate)}</p>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th className="text-center align-middle" rowSpan={2}>
              {reportHeaderColumn}
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
            records.map((winloss) => (
              <tr key={winloss.rollupKey}>
                <td>
                  <span className="text-right">{winloss.rollupKey}</span>
                </td>

                <td className="text-right">
                  {formatInteger(winloss.betCount)}
                </td>
                <td className="text-right">
                  {formatDecimal(winloss.turnover)}
                </td>
                <td className="text-right">
                  {formatDecimal(winloss.memberWinLoss)}
                </td>
                <td className="text-right">
                  {formatDecimal(winloss.agentWinLoss)}
                </td>
                {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
                  <td className="text-right">
                    {formatDecimal(winloss.masterWinLoss)}
                  </td>
                )}
                {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                  <td className="text-right">
                    {formatDecimal(winloss.superWinLoss)}
                  </td>
                )}
                {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
                  <td className="text-right">
                    {formatDecimal(winloss.companyWinLoss)}
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
              <td className="text-right">
                {formatDecimal(total.memberWinLoss)}
              </td>
              <td className="text-right">
                {formatDecimal(total.agentWinLoss)}
              </td>
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
    </>
  );
};

export default TableComponent;
