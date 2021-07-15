import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Label, Table } from 'reactstrap';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';
import './Table.scss';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewAgent,
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
    // Master Preset
    v161mpositiontaking_81,
    v161mpositiontaking_83,
    v161mpositiontaking_88,
    v161mpositiontaking_86,
    v161mlivepositiontaking_85,
    v161mlivepositiontaking_86,
    v161mlivepositiontaking_87,
    v161mlivepositiontaking_89,
    v161mlivepositiontaking_90,
    // Auto Master Preset
    isauto_v161mpositiontaking_81,
    isauto_v161mpositiontaking_83,
    isauto_v161mpositiontaking_88,
    isauto_v161mpositiontaking_86,
    isauto_v161mlivepositiontaking_85,
    isauto_v161mlivepositiontaking_86,
    isauto_v161mlivepositiontaking_87,
    isauto_v161mlivepositiontaking_89,
    isauto_v161mlivepositiontaking_90,
    auto_v161mpositiontaking_81,
    auto_v161mpositiontaking_83,
    auto_v161mpositiontaking_88,
    auto_v161mpositiontaking_86,
    auto_v161mlivepositiontaking_85,
    auto_v161mlivepositiontaking_86,
    auto_v161mlivepositiontaking_87,
    auto_v161mlivepositiontaking_89,
    auto_v161mlivepositiontaking_90,
    // Agent Max Position
    v161apositiontaking_81_max,
    v161apositiontaking_83_max,
    v161apositiontaking_88_max,
    v161apositiontaking_86_max,
    v161alivepositiontaking_85_max,
    v161alivepositiontaking_86_max,
    v161alivepositiontaking_87_max,
    v161alivepositiontaking_89_max,
    v161alivepositiontaking_90_max,
    // Agent Min Position
    v161apositiontaking_81_min,
    v161apositiontaking_83_min,
    v161apositiontaking_88_min,
    v161apositiontaking_86_min,
    v161alivepositiontaking_85_min,
    v161alivepositiontaking_86_min,
    v161alivepositiontaking_87_min,
    v161alivepositiontaking_89_min,
    v161alivepositiontaking_90_min,
  } = data;

  return (
    <div className="table-agent">
      <Table hover bordered striped>
        <thead>
          <tr>
            <th colSpan={4} className="text-center">
              Agent: {username}
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
                <Input type="checkbox" checked={!disableNumber} disabled />{' '}
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
        <thead>
          <tr>
            <th colSpan={7} className="text-center">
              Position Taking
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7} className="font-weight-bold">
              Number Game
            </td>
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
            <td className="text-right">Master Preset</td>
            <td>{formatDecimal(v161mpositiontaking_81)}</td>
            <td>{formatDecimal(v161mpositiontaking_83)}</td>
            <td>{formatDecimal(v161mpositiontaking_88)}</td>
            <td>{formatDecimal(v161mpositiontaking_86)}</td>
          </tr>
          <tr>
            <td rowSpan={2} className="text-right align-middle">
              Auto Master Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mpositiontaking_81)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mpositiontaking_83)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mpositiontaking_88)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mpositiontaking_86)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161mpositiontaking_81)}</td>
            <td>{formatDecimal(auto_v161mpositiontaking_83)}</td>
            <td>{formatDecimal(auto_v161mpositiontaking_88)}</td>
            <td>{formatDecimal(auto_v161mpositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Agent Max Position</td>
            <td>{formatDecimal(v161apositiontaking_81_max)}</td>
            <td>{formatDecimal(v161apositiontaking_83_max)}</td>
            <td>{formatDecimal(v161apositiontaking_88_max)}</td>
            <td>{formatDecimal(v161apositiontaking_86_max)}</td>
          </tr>
          <tr>
            <td className="text-right">Agent Min Position</td>
            <td>{formatDecimal(v161apositiontaking_81_min)}</td>
            <td>{formatDecimal(v161apositiontaking_83_min)}</td>
            <td>{formatDecimal(v161apositiontaking_88_min)}</td>
            <td>{formatDecimal(v161apositiontaking_86_min)}</td>
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
            <td className="text-right">Master Preset</td>
            <td>{formatDecimal(v161mlivepositiontaking_85)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_86)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_87)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_89)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td rowSpan={2} className="text-right align-middle">
              Auto Master Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mlivepositiontaking_85)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mlivepositiontaking_86)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mlivepositiontaking_87)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mlivepositiontaking_89)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161mlivepositiontaking_90)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161mlivepositiontaking_85)}</td>
            <td>{formatDecimal(auto_v161mlivepositiontaking_86)}</td>
            <td>{formatDecimal(auto_v161mlivepositiontaking_87)}</td>
            <td>{formatDecimal(auto_v161mlivepositiontaking_89)}</td>
            <td>{formatDecimal(auto_v161mlivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Agent Max Position</td>
            <td>{formatDecimal(v161alivepositiontaking_85_max)}</td>
            <td>{formatDecimal(v161alivepositiontaking_86_max)}</td>
            <td>{formatDecimal(v161alivepositiontaking_87_max)}</td>
            <td>{formatDecimal(v161alivepositiontaking_89_max)}</td>
            <td>{formatDecimal(v161alivepositiontaking_90_max)}</td>
          </tr>
          <tr>
            <td className="text-right">Agent Min Position</td>
            <td>{formatDecimal(v161alivepositiontaking_85_min)}</td>
            <td>{formatDecimal(v161alivepositiontaking_86_min)}</td>
            <td>{formatDecimal(v161alivepositiontaking_87_min)}</td>
            <td>{formatDecimal(v161alivepositiontaking_89_min)}</td>
            <td>{formatDecimal(v161alivepositiontaking_90_min)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
