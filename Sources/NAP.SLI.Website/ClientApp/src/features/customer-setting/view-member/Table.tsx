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
    minbetv161,
    maxbetv161,
    maxpermatchv161,
    maxperballv161,
    minbetv164,
    maxbetv164,
    maxpermatchv164,
    // Position Taking
    // Agent
    v161apositiontaking_81,
    v161apositiontaking_83,
    v161apositiontaking_88,
    v161apositiontaking_86,
    v161alivepositiontaking_85,
    v161alivepositiontaking_86,
    v161alivepositiontaking_87,
    v161alivepositiontaking_89,
    v161alivepositiontaking_90,
    // Master
    v161mpositiontaking_81,
    v161mpositiontaking_83,
    v161mpositiontaking_88,
    v161mpositiontaking_86,
    v161mlivepositiontaking_85,
    v161mlivepositiontaking_86,
    v161mlivepositiontaking_87,
    v161mlivepositiontaking_89,
    v161mlivepositiontaking_90,
    // Super
    v161spositiontaking_81,
    v161spositiontaking_83,
    v161spositiontaking_88,
    v161spositiontaking_86,
    v161slivepositiontaking_85,
    v161slivepositiontaking_86,
    v161slivepositiontaking_87,
    v161slivepositiontaking_89,
    v161slivepositiontaking_90,
    // Master Auto
    isauto_v161mpositiontaking_mem_81,
    isauto_v161mpositiontaking_mem_83,
    isauto_v161mpositiontaking_mem_88,
    isauto_v161mpositiontaking_mem_86,
    auto_v161mpositiontaking_mem_81,
    auto_v161mpositiontaking_mem_83,
    auto_v161mpositiontaking_mem_88,
    auto_v161mpositiontaking_mem_86,
    isauto_v161mlivepositiontaking_mem_85,
    isauto_v161mlivepositiontaking_mem_86,
    isauto_v161mlivepositiontaking_mem_87,
    isauto_v161mlivepositiontaking_mem_89,
    isauto_v161mlivepositiontaking_mem_90,
    auto_v161mlivepositiontaking_mem_85,
    auto_v161mlivepositiontaking_mem_86,
    auto_v161mlivepositiontaking_mem_87,
    auto_v161mlivepositiontaking_mem_89,
    auto_v161mlivepositiontaking_mem_90,
    // Super Auto
    auto_v161spositiontaking_81,
    auto_v161spositiontaking_83,
    auto_v161spositiontaking_86,
    auto_v161spositiontaking_88,
    isauto_v161spositiontaking_mem_81,
    isauto_v161spositiontaking_mem_83,
    isauto_v161spositiontaking_mem_88,
    isauto_v161spositiontaking_mem_86,
    auto_v161slivepositiontaking_85,
    auto_v161slivepositiontaking_86,
    auto_v161slivepositiontaking_87,
    auto_v161slivepositiontaking_89,
    auto_v161slivepositiontaking_90,
    isauto_v161slivepositiontaking_mem_85,
    isauto_v161slivepositiontaking_mem_86,
    isauto_v161slivepositiontaking_mem_87,
    isauto_v161slivepositiontaking_mem_89,
    isauto_v161slivepositiontaking_mem_90,
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
            <td>{formatInteger(minbetv161)}</td>
            <td>{formatInteger(maxbetv161)}</td>
            <td>{formatInteger(maxpermatchv161)}</td>
            <td>{formatInteger(maxperballv161)}</td>
          </tr>
          <tr>
            <td className="label text-left">Happy 5</td>
            <td>{formatInteger(minbetv164)}</td>
            <td>{formatInteger(maxbetv164)}</td>
            <td>{formatInteger(maxpermatchv164)}</td>
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
            <td>{formatDecimal(v161apositiontaking_81)}</td>
            <td>{formatDecimal(v161apositiontaking_83)}</td>
            <td>{formatDecimal(v161apositiontaking_88)}</td>
            <td>{formatDecimal(v161apositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Master</td>
            <td>{formatDecimal(v161mpositiontaking_81)}</td>
            <td>{formatDecimal(v161mpositiontaking_83)}</td>
            <td>{formatDecimal(v161mpositiontaking_88)}</td>
            <td>{formatDecimal(v161mpositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Super</td>
            <td>{formatDecimal(v161spositiontaking_81)}</td>
            <td>{formatDecimal(v161spositiontaking_83)}</td>
            <td>{formatDecimal(v161spositiontaking_88)}</td>
            <td>{formatDecimal(v161spositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mpositiontaking_mem_81)}
                  disabled
                />
                {formatDecimal(auto_v161mpositiontaking_mem_81)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mpositiontaking_mem_83)}
                  disabled
                />
                {formatDecimal(auto_v161mpositiontaking_mem_83)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mpositiontaking_mem_88)}
                  disabled
                />
                {formatDecimal(auto_v161mpositiontaking_mem_88)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mpositiontaking_mem_86)}
                  disabled
                />
                {formatDecimal(auto_v161mpositiontaking_mem_86)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right">Super Auto</td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_mem_81)}
                disabled
              />
              {formatDecimal(auto_v161spositiontaking_81)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_mem_83)}
                disabled
              />
              {formatDecimal(auto_v161spositiontaking_83)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_mem_88)}
                disabled
              />
              {formatDecimal(auto_v161spositiontaking_88)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_mem_86)}
                disabled
              />
              {formatDecimal(auto_v161spositiontaking_86)}
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
            <td>{formatDecimal(v161alivepositiontaking_85)}</td>
            <td>{formatDecimal(v161alivepositiontaking_86)}</td>
            <td>{formatDecimal(v161alivepositiontaking_87)}</td>
            <td>{formatDecimal(v161alivepositiontaking_89)}</td>
            <td>{formatDecimal(v161alivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Master</td>
            <td>{formatDecimal(v161mlivepositiontaking_85)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_86)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_87)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_89)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Super</td>
            <td>{formatDecimal(v161slivepositiontaking_85)}</td>
            <td>{formatDecimal(v161slivepositiontaking_86)}</td>
            <td>{formatDecimal(v161slivepositiontaking_87)}</td>
            <td>{formatDecimal(v161slivepositiontaking_89)}</td>
            <td>{formatDecimal(v161slivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mlivepositiontaking_mem_85)}
                  disabled
                />
                {formatDecimal(auto_v161mlivepositiontaking_mem_85)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mlivepositiontaking_mem_86)}
                  disabled
                />
                {formatDecimal(auto_v161mlivepositiontaking_mem_86)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mlivepositiontaking_mem_87)}
                  disabled
                />
                {formatDecimal(auto_v161mlivepositiontaking_mem_87)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mlivepositiontaking_mem_89)}
                  disabled
                />
                {formatDecimal(auto_v161mlivepositiontaking_mem_89)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161mlivepositiontaking_mem_90)}
                  disabled
                />
                {formatDecimal(auto_v161mlivepositiontaking_mem_90)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right">Super Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161slivepositiontaking_mem_85)}
                  disabled
                />
                {formatDecimal(auto_v161slivepositiontaking_85)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161slivepositiontaking_mem_86)}
                  disabled
                />
                {formatDecimal(auto_v161slivepositiontaking_86)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161slivepositiontaking_mem_87)}
                  disabled
                />
                {formatDecimal(auto_v161slivepositiontaking_87)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161slivepositiontaking_mem_89)}
                  disabled
                />
                {formatDecimal(auto_v161slivepositiontaking_89)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isauto_v161slivepositiontaking_mem_90)}
                  disabled
                />
                {formatDecimal(auto_v161slivepositiontaking_90)}
              </Label>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
