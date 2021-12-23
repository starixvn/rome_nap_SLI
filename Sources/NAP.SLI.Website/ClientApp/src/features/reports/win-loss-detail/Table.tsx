import { useAppDispatch } from 'app/store';
import Pagination from 'components/pagination/Component';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import {
  CustomerLevels,
  getDownlineLevel,
  isUplineOrSameLevel,
} from 'utils/CustomerLevelUtils';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';
import { PageSizes } from 'utils/ReportUtils';
import { query, Record, drillDown } from './reducer';

type RowProps = {
  roleId: number;
  record: Record;
  isFooter: boolean;
  usernameClick?: (record: Record) => void;
};

const getRowClassName = (isFooter: boolean) => {
  if (isFooter) {
    return 'total-row';
  }
};

const RowComponent = ({
  roleId,
  record,
  isFooter,
  usernameClick,
}: RowProps) => {
  return (
    <tr className={getRowClassName(isFooter)}>
      <td>
        {isFooter ? (
          <span>Total</span>
        ) : (
          <span
            className="text-link"
            onClick={() => usernameClick && usernameClick(record)}
          >
            {record.username}
          </span>
        )}
      </td>
      <td className="text-right">{formatInteger(record.betCount)}</td>
      <td className="text-right">{formatDecimal(record.turnover)}</td>
      <td className="text-right">{formatDecimal(record.memberWinLoss)}</td>
      <td className="text-right">{formatDecimal(record.agentWinLoss)}</td>
      {isUplineOrSameLevel(roleId, CustomerLevels.Master) && (
        <td className="text-right">{formatDecimal(record.masterWinLoss)}</td>
      )}
      {isUplineOrSameLevel(roleId, CustomerLevels.Super) && (
        <td className="text-right">{formatDecimal(record.superWinLoss)}</td>
      )}
      <td className="text-right">{formatDecimal(record.companyWinLoss)}</td>
    </tr>
  );
};

const TableComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { queryData, customer, queryArg } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

  if (!queryData || !customer) {
    return <></>;
  }

  const { pageIndex, pageSize, isHistory, fromDate, toDate } = queryArg;
  const { records, total, totalRecords } = queryData;
  const { roleId } = customer;

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

  const handleUsernameClick = (record: Record) => {
    const customer = {
      custId: record.custId,
      roleId: getDownlineLevel(roleId),
      username: record.username,
    };
    if (roleId === CustomerLevels.Agent) {
      navigate({
        pathname: '/report/bet-list/date',
        search:
          '' +
          createSearchParams({
            custId: customer.custId.toString(),
            roleId: '4',
            username: customer.username,
            fromDate,
            toDate,
          }),
      });
    } else {
      dispatch(drillDown(customer));
    }
  };

  const handlePageChange = async (
    pageIndex: number,
    pageSize: number,
    callback: Func,
  ) => {
    const { custId, roleId } = customer;
    await dispatch(
      query({
        isHistory,
        custId,
        roleId,
        fromDate,
        toDate,
        pageIndex,
        pageSize,
      }),
    );
    callback();
  };

  return (
    <>
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
              <RowComponent
                key={`record_${record.custId}`}
                roleId={roleId}
                record={record}
                isFooter={false}
                usernameClick={handleUsernameClick}
              />
            ))
          )}
        </tbody>
        {records.length > 0 && total && (
          <tfoot>
            <RowComponent roleId={roleId} record={total} isFooter={true} />
          </tfoot>
        )}
      </Table>
      {totalRecords > 0 && (
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageSizes={PageSizes}
          total={totalRecords}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default TableComponent;
