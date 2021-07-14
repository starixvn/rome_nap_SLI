import './Table.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Label, Table } from 'reactstrap';
import { formatDecimal, formatInteger } from 'utils/NumberUtils';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewMaster,
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
    maxpermatch164,
    // Position Taking
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
    // Super Preset
    v161spositiontaking_81,
    v161spositiontaking_83,
    v161spositiontaking_88,
    v161spositiontaking_86,
    v161slivepositiontaking_85,
    v161slivepositiontaking_86,
    v161slivepositiontaking_87,
    v161slivepositiontaking_89,
    v161slivepositiontaking_90,
    // Auto Super Preset
    isauto_v161spositiontaking_81,
    isauto_v161spositiontaking_83,
    isauto_v161spositiontaking_88,
    isauto_v161spositiontaking_86,
    isauto_v161slivepositiontaking_85,
    isauto_v161slivepositiontaking_86,
    isauto_v161slivepositiontaking_87,
    isauto_v161slivepositiontaking_89,
    isauto_v161slivepositiontaking_90,
    auto_v161spositiontaking_81,
    auto_v161spositiontaking_83,
    auto_v161spositiontaking_88,
    auto_v161spositiontaking_86,
    auto_v161slivepositiontaking_85,
    auto_v161slivepositiontaking_86,
    auto_v161slivepositiontaking_87,
    auto_v161slivepositiontaking_89,
    auto_v161slivepositiontaking_90,
    // Master Max Position
    v161mpositiontaking_81_max,
    v161mpositiontaking_83_max,
    v161mpositiontaking_88_max,
    v161mpositiontaking_86_max,
    v161mlivepositiontaking_85_max,
    v161mlivepositiontaking_86_max,
    v161mlivepositiontaking_87_max,
    v161mlivepositiontaking_89_max,
    v161mlivepositiontaking_90_max,
    // Master Min Position
    v161mpositiontaking_81_min,
    v161mpositiontaking_83_min,
    v161mpositiontaking_88_min,
    v161mpositiontaking_86_min,
    v161mlivepositiontaking_85_min,
    v161mlivepositiontaking_86_min,
    v161mlivepositiontaking_87_min,
    v161mlivepositiontaking_89_min,
    v161mlivepositiontaking_90_min,
  } = data;

  return (
    <div className="table">
      <Table hover bordered striped>
        <thead>
          <tr>
            <th colSpan={4} className="text-center">
              Master: {username}
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
            <td>{formatInteger(minbetv161)}</td>
            <td>{formatInteger(maxbetv161)}</td>
            <td>{formatInteger(maxpermatchv161)}</td>
            <td>{formatInteger(maxperballv161)}</td>
          </tr>
          <tr>
            <td className="label text-left">Happy 5</td>
            <td>{formatInteger(minbetv164)}</td>
            <td>{formatInteger(maxbetv164)}</td>
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
            <td className="text-right">Master Preset</td>
            <td>{formatDecimal(v161mpositiontaking_81)}</td>
            <td>{formatDecimal(v161mpositiontaking_83)}</td>
            <td>{formatDecimal(v161mpositiontaking_88)}</td>
            <td>{formatDecimal(v161mpositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Super Preset</td>
            <td>{formatDecimal(v161spositiontaking_81)}</td>
            <td>{formatDecimal(v161spositiontaking_83)}</td>
            <td>{formatDecimal(v161spositiontaking_88)}</td>
            <td>{formatDecimal(v161spositiontaking_86)}</td>
          </tr>
          <tr>
            <td rowSpan={2} className="text-right align-middle">
              Auto Super Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_81)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_83)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_88)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161spositiontaking_86)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161spositiontaking_81)}</td>
            <td>{formatDecimal(auto_v161spositiontaking_83)}</td>
            <td>{formatDecimal(auto_v161spositiontaking_88)}</td>
            <td>{formatDecimal(auto_v161spositiontaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Max Position</td>
            <td>{formatDecimal(v161mpositiontaking_81_max)}</td>
            <td>{formatDecimal(v161mpositiontaking_83_max)}</td>
            <td>{formatDecimal(v161mpositiontaking_88_max)}</td>
            <td>{formatDecimal(v161mpositiontaking_86_max)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Min Position</td>
            <td>{formatDecimal(v161mpositiontaking_81_min)}</td>
            <td>{formatDecimal(v161mpositiontaking_83_min)}</td>
            <td>{formatDecimal(v161mpositiontaking_88_min)}</td>
            <td>{formatDecimal(v161mpositiontaking_86_min)}</td>
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
            <td className="text-right">Master Preset</td>
            <td>{formatDecimal(v161mlivepositiontaking_85)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_86)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_87)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_89)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Super Preset</td>
            <td>{formatDecimal(v161slivepositiontaking_85)}</td>
            <td>{formatDecimal(v161slivepositiontaking_86)}</td>
            <td>{formatDecimal(v161slivepositiontaking_87)}</td>
            <td>{formatDecimal(v161slivepositiontaking_89)}</td>
            <td>{formatDecimal(v161slivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td rowSpan={2} className="text-right align-middle">
              Auto Super Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161slivepositiontaking_85)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161slivepositiontaking_86)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161slivepositiontaking_87)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161slivepositiontaking_89)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isauto_v161slivepositiontaking_90)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161slivepositiontaking_85)}</td>
            <td>{formatDecimal(auto_v161slivepositiontaking_86)}</td>
            <td>{formatDecimal(auto_v161slivepositiontaking_87)}</td>
            <td>{formatDecimal(auto_v161slivepositiontaking_89)}</td>
            <td>{formatDecimal(auto_v161slivepositiontaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Max Position</td>
            <td>{formatDecimal(v161mlivepositiontaking_85_max)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_86_max)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_87_max)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_89_max)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_90_max)}</td>
          </tr>
          <tr>
            <td className="text-right">Master Min Position</td>
            <td>{formatDecimal(v161mlivepositiontaking_85_min)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_86_min)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_87_min)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_89_min)}</td>
            <td>{formatDecimal(v161mlivepositiontaking_90_min)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
