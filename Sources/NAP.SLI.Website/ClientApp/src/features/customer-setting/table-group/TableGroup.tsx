import React from 'react';
import { Input, Label, Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import { BetSetting, CustomerInfo } from '../types';

export type Props = CustomerInfo &
  BetSetting & {
    level: string;
  };

const TableGroup = ({
  level,
  userName,
  firstName,
  lastName,
  phone,
  mobilePhone,
  fax,
  disableNumber,
  v161MinBet,
  v161MaxBet,
  v161MaxPerMatch,
  v161MaxPerBall,
  v164MinBet,
  v164MaxBet,
  v164MaxPerMatch,
}: Props) => {
  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={4} className="text-center">
              {level}: {userName}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label">First Name</td>
            <td>{firstName}</td>
            <td className="label">Last Name</td>
            <td>{lastName}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phone}</td>
            <td>Mobile Phone</td>
            <td>{mobilePhone}</td>
          </tr>
          <tr>
            <td>Fax</td>
            <td>{fax}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Table bordered>
        <thead>
          <tr>
            <th className="text-center">Product Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-content">
            <td className="text-center">
              <Label check>
                <Input type="checkbox" checked={!disableNumber} disabled />{' '}
                Enable Number Game
              </Label>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={5} className="text-center">
              Bet Setting
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="table-header">
            <td></td>
            <td className="font-weight-bold">Min Bet</td>
            <td className="font-weight-bold">Max Bet</td>
            <td className="font-weight-bold">Max Per Match</td>
            <td className="font-weight-bold">Max Per Ball</td>
          </tr>
          <tr className="table-content">
            <td className="label text-left table-header">Number Game</td>
            <td>{formatDecimal(v161MinBet)}</td>
            <td>{formatDecimal(v161MaxBet)}</td>
            <td>{formatDecimal(v161MaxPerMatch)}</td>
            <td>{formatDecimal(v161MaxPerBall)}</td>
          </tr>
          <tr className="table-content">
            <td className="label text-left table-header">Happy 5</td>
            <td>{formatDecimal(v164MinBet)}</td>
            <td>{formatDecimal(v164MaxBet)}</td>
            <td>{formatDecimal(v164MaxPerMatch)}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Table bordered className="mb-0">
        <thead>
          <tr>
            <th colSpan={7} className="text-center">
              Position Taking
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-header">
            <td colSpan={7} className="font-weight-bold">
              Number Game
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableGroup;
