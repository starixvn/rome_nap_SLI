import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import { CustomerLevels, isUplineOrSameLevel } from 'utils/CustomerLevelUtils';
import { Record } from './reducer';
import { createSearchParams, useNavigate } from 'react-router-dom';
import './Table.scss';

enum RowType {
  Normal = 0,
  SubTotal = 1,
  Total = 2,
  Happy5LinkedGame = 3,
  GrandTotal = 4,
}

type RowProps = {
  roleId: number;
  record: Record;
  type: RowType;
  normalTypeClick?: (record: Record) => void;
  linkedGameTypeClick?: (record: Record) => void;
};

const getRowClassName = (type: RowType) => {
  switch (type) {
    case RowType.SubTotal:
      return 'sub-total-row';
    case RowType.Total:
      return 'total-row';
    case RowType.GrandTotal:
      return 'grand-total-row';
  }
};

const RowComponent = ({
  roleId,
  record,
  type,
  normalTypeClick,
  linkedGameTypeClick,
}: RowProps) => {
  return (
    <tr className={getRowClassName(type)}>
      <td>
        {type === RowType.Normal ? (
          <span
            className="text-link"
            onClick={() => normalTypeClick && normalTypeClick(record)}
          >
            {record.betTypeName}
          </span>
        ) : type === RowType.Happy5LinkedGame ? (
          <span
            className="text-link"
            onClick={() => linkedGameTypeClick && linkedGameTypeClick(record)}
          >
            {record.betTypeName}
          </span>
        ) : type === RowType.SubTotal ? (
          'Sub Total'
        ) : type === RowType.Total ? (
          'Total'
        ) : (
          'Grand Total'
        )}
      </td>
      <td className="text-right">{formatDecimal(record.turnover)}</td>
      <td className="text-right">{formatDecimal(record.memberWinLoss)}</td>
      <td className="text-right">{formatDecimal(record.agentWinLoss)}</td>
      {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
        <td className="text-right">{formatDecimal(record.masterWinLoss)}</td>
      )}
      {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
        <td className="text-right">{formatDecimal(record.superWinLoss)}</td>
      )}
      {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
        <td className="text-right">{formatDecimal(record.companyWinLoss)}</td>
      )}
    </tr>
  );
};

const TableComponent = () => {
  const navigate = useNavigate();
  const { queryData, queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.matchWinLossDetail,
  );

  if (!queryData || !queryCustomer) {
    return <></>;
  }

  const { matches, total, grandTotal, happy5LinkedGames } = queryData;
  const { roleId, custId } = queryCustomer;
  const { fromDate, toDate } = queryArg;

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

  const handleNormalTypeClick = (record: Record) => {
    const { matchId, betType, liveIndicator } = record;
    const search =
      '' +
      createSearchParams({
        custId: custId.toString(),
        roleId: '4',
        matchId: matchId.toString(),
        liveIndicator: liveIndicator.toString(),
        betType: betType.toString(),
      });
    navigate({
      pathname: '/report/bet-list/match',
      search,
    });
  };

  const handleLinkedGameTypeClick = (record: Record) => {
    const { betType } = record;
    const search =
      '' +
      createSearchParams({
        custId: custId.toString(),
        roleId: '4',
        betType: betType.toString(),
        fromDate,
        toDate,
      });
    navigate({
      pathname: '/report/bet-list/bet-type',
      search,
    });
  };

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
          matches.map((match, index) => (
            <Fragment key={`match_${match.matchName}_${index}`}>
              <tr>
                <td className="match-row" colSpan={7 - removedColumnTotal}>
                  <span className="league-title">{match.leagueName}</span>
                  <span className="match-title">{match.matchName}</span>
                </td>
              </tr>
              {match.records.map((record, index) => (
                <RowComponent
                  key={`record_${match.matchName}_${index}`}
                  roleId={roleId}
                  record={record}
                  type={RowType.Normal}
                  normalTypeClick={handleNormalTypeClick}
                />
              ))}
              <RowComponent
                key={`match_${match.matchName}`}
                roleId={roleId}
                record={match.total}
                type={RowType.SubTotal}
              />
            </Fragment>
          ))
        )}
        {matches.length > 0 && total && (
          <RowComponent roleId={roleId} record={total} type={RowType.Total} />
        )}
        {happy5LinkedGames &&
          happy5LinkedGames.map((record, index) => (
            <RowComponent
              key={`record_happy5LinkedGame_${index}`}
              roleId={roleId}
              record={record}
              type={RowType.Normal}
              linkedGameTypeClick={handleLinkedGameTypeClick}
            />
          ))}
      </tbody>
      <tfoot>
        {happy5LinkedGames.length > 0 && grandTotal && (
          <RowComponent
            roleId={roleId}
            record={grandTotal}
            type={RowType.GrandTotal}
          />
        )}
      </tfoot>
    </Table>
  );
};

export default TableComponent;
