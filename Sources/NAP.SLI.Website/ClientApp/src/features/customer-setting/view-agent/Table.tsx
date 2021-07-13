import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewAgent,
  );

  if (!data) {
    return <></>;
  }

  const { username, firstname, lastname, phone, mobilephone, fax } = data;

  return (
    <Table hover bordered striped>
      <tbody>
        <tr>
          <td colSpan={4}>Agent: {username}</td>
        </tr>
        <tr>
          <td>First Name</td>
          <td>{firstname}</td>
          <td>Last Name</td>
          <td>{lastname}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{phone}</td>
          <td>Mobile Phone</td>
          <td>{mobilephone}</td>
        </tr>
        <tr>
          <td>Fax</td>
          <td>{fax}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableComponent;
