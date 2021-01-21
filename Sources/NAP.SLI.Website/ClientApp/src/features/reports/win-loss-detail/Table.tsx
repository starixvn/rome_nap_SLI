import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import {
  formatInteger,
  formatDecimal,
} from '../../../common/utils/NumberUtils';
import {
  CustomerLevels,
  isUplineOrSameLevel,
  getDownlineLevel,
} from '../../../common/utils/CustomerLevelUtils';
import { RouteLinks } from '../../../common/utils/RouteUtils';
import { selectCustomer, Record } from './reducer';

const TableComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, customer } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  if (!data || !customer) {
    return <></>;
  }

  const { records, total } = data;
  const { roleId } = customer;
  const removedColumnTotal =
    roleId === CustomerLevels.Master
      ? 1
      : roleId === CustomerLevels.Agent
      ? 2
      : 0;

  const handleUsernameClicked = (record: Record) => {
    const customer = {
      custId: record.custId,
      roleId: getDownlineLevel(roleId),
      username: record.username,
    };
    if (roleId === CustomerLevels.Agent) {
      history.push(RouteLinks.BET_LIST, customer);
      return;
    }

    dispatch(selectCustomer({ customer, isReset: false }));
  };

  return (
    <Table hover bordered striped>
      <thead>
        <tr>
          <th className="text-center align-middle" rowSpan={2}>
            Username
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
          <th className="text-center">Company</th>
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
            <tr key={`Row_${record.custId}`}>
              <td>
                <span
                  className="text-link"
                  onClick={() => handleUsernameClicked(record)}
                >
                  {record.username}
                </span>
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
              <td className="text-right">
                {formatDecimal(record.companyWinLoss)}
              </td>
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
