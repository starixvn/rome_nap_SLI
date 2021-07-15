import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Label, Table } from 'reactstrap';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';
import './Table.scss';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewMember,
  );

  if (!data) {
    return <></>;
  }

  const {
    username,
    firstname,
    lastname,
    phone,
    mobilephone,
    fax,
    disableNumber,
    // Bet Setting
    minBetv161,
    maxBetv161,
    maxpermatchv161,
    maxperballv161,
    minBetv164,
    maxBetv164,
    maxpermatch164,
  } = data;

  return (
    <div className="table-member">
      <Table hover bordered striped>
        <thead>
          <tr>
            <th colSpan={4} className="text-center">
              Member: {username}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="label">First Name</td>
            <td>{firstname}</td>
            <td className="label">Last Name</td>
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
      <Table hover bordered striped>
        <thead>
          <tr>
            <th className="text-center">Product Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">
              <Label check>
                <Input type="checkbox" checked={!disableNumber} disabled />
                Enable Number Game
              </Label>
            </td>
          </tr>
        </tbody>
      </Table>
      <Table hover bordered striped>
        <thead>
          <tr>
            <th colSpan={5} className="text-center">
              Bet Setting
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td></td>
            <td className="font-weight-bold">Min Bet</td>
            <td className="font-weight-bold">Max Bet</td>
            <td className="font-weight-bold">Max Per Match</td>
            <td className="font-weight-bold">Max Per Ball</td>
          </tr>
          <tr>
            <td className="label text-left">Number Game</td>
            <td>{formatInteger(minBetv161)}</td>
            <td>{formatInteger(maxBetv161)}</td>
            <td>{formatInteger(maxpermatchv161)}</td>
            <td>{formatInteger(maxperballv161)}</td>
          </tr>
          <tr>
            <td className="label text-left">Happy 5</td>
            <td>{formatInteger(minBetv164)}</td>
            <td>{formatInteger(maxBetv164)}</td>
            <td>{formatInteger(maxpermatch164)}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <Table hover bordered striped className="mb-0">
        <tbody className="text-center table-position-taking">
          <tr>
            <td rowSpan={7} className="label text-right align-middle">
              Deadball
            </td>
            <td className="position-label"></td>
            <td className="font-weight-bold first-col">1st Last O/U</td>
            <td className="font-weight-bold">1st Last O/E</td>
            <td className="font-weight-bold">Warrior</td>
            <td className="font-weight-bold">Odd/Even</td>
          </tr>
          <tr>
            <td className="text-right">Agent</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Master</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Super</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Auto</td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right">Super Auto</td>
            <td>
              <Input type="checkbox" checked={false} disabled />
              {formatDecimal(0)}
            </td>
            <td>
              <Input type="checkbox" checked={false} disabled />
              {formatDecimal(0)}
            </td>
            <td>
              <Input type="checkbox" checked={false} disabled />
              {formatDecimal(0)}
            </td>
            <td>
              <Input type="checkbox" checked={false} disabled />
              {formatDecimal(0)}
            </td>
          </tr>
        </tbody>
      </Table>
      <Table hover bordered striped>
        <tbody className="text-center table-position-taking">
          <tr>
            <td rowSpan={7} className="label text-right align-middle">
              Live!
            </td>
            <td className="position-label"></td>
            <td className="font-weight-bold first-col">Over/Under</td>
            <td className="font-weight-bold">Odd/Even</td>
            <td className="font-weight-bold">High/Low</td>
            <td className="font-weight-bold">Next Combo</td>
            <td className="font-weight-bold">Number Wheel</td>
          </tr>
          <tr>
            <td className="text-right">Agent</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Master</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Super</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
            <td>{formatDecimal(0)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Auto</td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right">Super Auto</td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input type="checkbox" checked={false} disabled />
                {formatDecimal(0)}
              </Label>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
