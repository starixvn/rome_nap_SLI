import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import TableGroup from '../table-group/TableGroup';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewMaster,
  );

  if (!data) {
    return <></>;
  }

  const {
    userName,
    firstName,
    lastName,
    phone,
    mobilePhone,
    fax,
    disableNumber,
    // Bet Setting
    v161MinBet,
    v161MaxBet,
    v161MaxPerMatch,
    v161MaxPerBall,
    v164MinBet,
    v164MaxBet,
    v164MaxPerMatch,
    // Position Taking
    // Master Preset
    v161mPositionTaking_81,
    v161mPositionTaking_83,
    v161mPositionTaking_88,
    v161mPositionTaking_86,
    v161mLivePositionTaking_85,
    v161mLivePositionTaking_86,
    v161mLivePositionTaking_87,
    v161mLivePositionTaking_89,
    v161mLivePositionTaking_90,
    // Super Preset
    v161sPositionTaking_81,
    v161sPositionTaking_83,
    v161sPositionTaking_88,
    v161sPositionTaking_86,
    v161sLivePositionTaking_85,
    v161sLivePositionTaking_86,
    v161sLivePositionTaking_87,
    v161sLivePositionTaking_89,
    v161sLivePositionTaking_90,
    // Auto Super Preset
    isAuto_v161sPositionTaking_81,
    isAuto_v161sPositionTaking_83,
    isAuto_v161sPositionTaking_88,
    isAuto_v161sPositionTaking_86,
    isAuto_v161sLivePositionTaking_85,
    isAuto_v161sLivePositionTaking_86,
    isAuto_v161sLivePositionTaking_87,
    isAuto_v161sLivePositionTaking_89,
    isAuto_v161sLivePositionTaking_90,
    auto_v161sPositionTaking_81,
    auto_v161sPositionTaking_83,
    auto_v161sPositionTaking_88,
    auto_v161sPositionTaking_86,
    auto_v161sLivePositionTaking_85,
    auto_v161sLivePositionTaking_86,
    auto_v161sLivePositionTaking_87,
    auto_v161sLivePositionTaking_89,
    auto_v161sLivePositionTaking_90,
    // Master Max Position
    v161mPositionTaking_81_Max,
    v161mPositionTaking_83_Max,
    v161mPositionTaking_88_Max,
    v161mPositionTaking_86_Max,
    v161mLivePositionTaking_85_Max,
    v161mLivePositionTaking_86_Max,
    v161mLivePositionTaking_87_Max,
    v161mLivePositionTaking_89_Max,
    v161mLivePositionTaking_90_Max,
    // Master Min Position
    v161mPositionTaking_81_Min,
    v161mPositionTaking_83_Min,
    v161mPositionTaking_88_Min,
    v161mPositionTaking_86_Min,
    v161mLivePositionTaking_85_Min,
    v161mLivePositionTaking_86_Min,
    v161mLivePositionTaking_87_Min,
    v161mLivePositionTaking_89_Min,
    v161mLivePositionTaking_90_Min,
  } = data;

  return (
    <div className="table">
      <TableGroup
        level="Master"
        userName={userName}
        firstName={firstName}
        lastName={lastName}
        phone={phone}
        mobilePhone={mobilePhone}
        fax={fax}
        disableNumber={disableNumber}
        v161MinBet={v161MinBet}
        v161MaxBet={v161MaxBet}
        v161MaxPerMatch={v161MaxPerMatch}
        v161MaxPerBall={v161MaxPerBall}
        v164MinBet={v164MinBet}
        v164MaxBet={v164MaxBet}
        v164MaxPerMatch={v164MaxPerMatch}
      />
      <Table bordered className="mb-0">
        <tbody className="text-center table-position-taking">
          <tr className="table-sub-header">
            <td
              rowSpan={7}
              className="label text-right align-middle table-header"
            >
              Deadball
            </td>
            <td className="position-label"></td>
            <td className="font-weight-bold first-col">1st Last O/U</td>
            <td className="font-weight-bold">1st Last O/E</td>
            <td className="font-weight-bold">Warrior</td>
            <td className="font-weight-bold">Odd/Even</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Preset</td>
            <td>{formatDecimal(v161mPositionTaking_81)}</td>
            <td>{formatDecimal(v161mPositionTaking_83)}</td>
            <td>{formatDecimal(v161mPositionTaking_88)}</td>
            <td>{formatDecimal(v161mPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Preset</td>
            <td>{formatDecimal(v161sPositionTaking_81)}</td>
            <td>{formatDecimal(v161sPositionTaking_83)}</td>
            <td>{formatDecimal(v161sPositionTaking_88)}</td>
            <td>{formatDecimal(v161sPositionTaking_86)}</td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              className="text-right table-sub-header align-middle"
            >
              Auto Super Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_81)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_83)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_88)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_86)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161sPositionTaking_81)}</td>
            <td>{formatDecimal(auto_v161sPositionTaking_83)}</td>
            <td>{formatDecimal(auto_v161sPositionTaking_88)}</td>
            <td>{formatDecimal(auto_v161sPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Max Position</td>
            <td>{formatDecimal(v161mPositionTaking_81_Max)}</td>
            <td>{formatDecimal(v161mPositionTaking_83_Max)}</td>
            <td>{formatDecimal(v161mPositionTaking_88_Max)}</td>
            <td>{formatDecimal(v161mPositionTaking_86_Max)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Min Position</td>
            <td>{formatDecimal(v161mPositionTaking_81_Min)}</td>
            <td>{formatDecimal(v161mPositionTaking_83_Min)}</td>
            <td>{formatDecimal(v161mPositionTaking_88_Min)}</td>
            <td>{formatDecimal(v161mPositionTaking_86_Min)}</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered>
        <tbody className="text-center table-position-taking">
          <tr className="table-sub-header">
            <td
              rowSpan={7}
              className="label text-right align-middle table-header"
            >
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
            <td className="text-right table-sub-header">Master Preset</td>
            <td>{formatDecimal(v161mLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Preset</td>
            <td>{formatDecimal(v161sLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              className="text-right table-sub-header align-middle"
            >
              Auto Super Preset
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sLivePositionTaking_85)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sLivePositionTaking_86)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sLivePositionTaking_87)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sLivePositionTaking_89)}
                disabled
              />
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sLivePositionTaking_90)}
                disabled
              />
            </td>
          </tr>
          <tr>
            <td>{formatDecimal(auto_v161sLivePositionTaking_85)}</td>
            <td>{formatDecimal(auto_v161sLivePositionTaking_86)}</td>
            <td>{formatDecimal(auto_v161sLivePositionTaking_87)}</td>
            <td>{formatDecimal(auto_v161sLivePositionTaking_89)}</td>
            <td>{formatDecimal(auto_v161sLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Max Position</td>
            <td>{formatDecimal(v161mLivePositionTaking_85_Max)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_86_Max)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_87_Max)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_89_Max)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_90_Max)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Min Position</td>
            <td>{formatDecimal(v161mLivePositionTaking_85_Min)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_86_Min)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_87_Min)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_89_Min)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_90_Min)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
