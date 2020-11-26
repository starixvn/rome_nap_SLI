import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';

const AgentList = () => {
  const { data } = useSelector(state => state.winLossDetail);
  const { records } = data;

  const renderTableBody = () => {
    if (records.length === 0) {
      return (
        <tr>
          <td className="text-center" colSpan='7'>
            There is no information
          </td>
        </tr>
      );
    }

    return (
      <>
        {records.map(record =>
          <tr key={`Row_${user.custId}`}>
            <td>
              <span className="text-link" onClick={() => dispatch(toggleEditUserModal({ user }))}>{user.userName}</span>
            </td>
            <td>
              {user.firstName}
            </td>
            <td>
              {user.lastName}
            </td>
            <td>
              {getGroupName(user.groupId)}
            </td>
            <td>
              {user.creator}
            </td>
            <td className="text-center">
              {user.createdDate}
            </td>
            <td className="text-center">
              <Input type="checkbox" checked={!user.closed} onChange={e => handleStatusClick(user)} />
            </td>
            <td className="text-center">
              <Icon className="cursor-pointer" path={mdiLockReset} onClick={() => dispatch(toggleResetUserPasswordModal({ user }))} />
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
          <th className="text-center align-middle" rowSpan='2'>No. of Ticket</th>
          <th className="text-center align-middle" rowSpan='2'>Turnover</th>
          <th className="text-center" colSpan='4'>Win/Loss</th>
        </tr>
        <tr>
          <th className="text-center">Member</th>
          <th className="text-center">Agent</th>
          <th className="text-center">Master</th>
          <th className="text-center">Company</th>
        </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </Table>
  );
}

export default AgentList;