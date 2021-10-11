import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import { CustomerLevels, isUplineOrSameLevel } from 'utils/CustomerLevelUtils';
import { Record } from './reducer';
import { useAppDispatch } from 'app/store';
import { useHistory } from 'react-router';
import { RouteLinks } from 'utils/RouteUtils';

enum RowType {
  Normal = 0,
  SubTotal = 1,
  Total = 2,
}

type RowProps = {
  roleId: number;
  record: Record;
  type: RowType;
  typeClick?: (record: Record) => void;
};

const RowComponent = ({ roleId, record, type, typeClick }: RowProps) => {
  return (
    <tr>
      <td>
        {type === RowType.Normal ? (
          <span
            className="text-link"
            onClick={() => typeClick && typeClick(record)}
          >
            {record.betTypeName}
          </span>
        ) : type === RowType.SubTotal ? (
          'Sub Total'
        ) : (
          'Total'
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
  const history = useHistory();
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

  const handleTypeClick = (record: Record) => {
    const { matchId, betType } = record;

    history.push(RouteLinks.BET_LIST, {
      ...queryCustomer,
      matchWinLossDetail: {
        matchId,
        bettype: betType,
      },
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
          matches.map((match) => (
            <>
              <tr>
                <td colSpan={7 - removedColumnTotal}>
                  {match.leagueName} &#62;&#62;&#62; {match.matchName}
                </td>
              </tr>
              {match.records.map((record, index) => (
                <RowComponent
                  key={`record_${match.matchName}_${index}`}
                  roleId={roleId}
                  record={record}
                  type={RowType.Normal}
                  typeClick={handleTypeClick}
                />
              ))}
              <RowComponent
                key={`match_${match.matchName}`}
                roleId={roleId}
                record={match.total}
                type={RowType.SubTotal}
              />
            </>
          ))
        )}
      </tbody>
      {matches.length > 0 && total && (
        <tfoot>
          <RowComponent roleId={roleId} record={total} type={RowType.Total} />
        </tfoot>
      )}
    </Table>
  );
};

export default TableComponent;
