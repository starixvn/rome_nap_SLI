import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import '../Table.scss';
import TableGroup from '../table-group/TableGroup';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewSuper,
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
    // Super Max
    v161sPositionTaking_81_Max,
    v161sPositionTaking_83_Max,
    v161sPositionTaking_86_Max,
    v161sPositionTaking_88_Max,
    v161sLivePositionTaking_85_Max,
    v161sLivePositionTaking_86_Max,
    v161sLivePositionTaking_87_Max,
    v161sLivePositionTaking_89_Max,
    v161sLivePositionTaking_90_Max,
    // Agent
    v161aPositionTaking_81,
    v161aPositionTaking_83,
    v161aPositionTaking_86,
    v161aPositionTaking_88,
    v161aLivePositionTaking_85,
    v161aLivePositionTaking_86,
    v161aLivePositionTaking_87,
    v161aLivePositionTaking_89,
    v161aLivePositionTaking_90,
    // Master
    v161mPositionTaking_81,
    v161mPositionTaking_83,
    v161mPositionTaking_86,
    v161mPositionTaking_88,
    v161mLivePositionTaking_85,
    v161mLivePositionTaking_86,
    v161mLivePositionTaking_87,
    v161mLivePositionTaking_89,
    v161mLivePositionTaking_90,
    // Super Min
    v161sPositionTaking_81_Min,
    v161sPositionTaking_83_Min,
    v161sPositionTaking_86_Min,
    v161sPositionTaking_88_Min,
    v161sLivePositionTaking_85_Min,
    v161sLivePositionTaking_86_Min,
    v161sLivePositionTaking_87_Min,
    v161sLivePositionTaking_89_Min,
    v161sLivePositionTaking_90_Min,
  } = data;

  return (
    <div className="table">
      <TableGroup
        level="Super"
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
        <tbody className="text-center">
          <tr className="table-sub-header">
            <td
              rowSpan={5}
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
            <td className="text-right table-sub-header">Super Max Position</td>
            <td>{formatDecimal(v161sPositionTaking_81_Max)}</td>
            <td>{formatDecimal(v161sPositionTaking_83_Max)}</td>
            <td>{formatDecimal(v161sPositionTaking_88_Max)}</td>
            <td>{formatDecimal(v161sPositionTaking_86_Max)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Max Position</td>
            <td>{formatDecimal(v161mPositionTaking_81)}</td>
            <td>{formatDecimal(v161mPositionTaking_83)}</td>
            <td>{formatDecimal(v161mPositionTaking_88)}</td>
            <td>{formatDecimal(v161mPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Agent Max Position</td>
            <td>{formatDecimal(v161aPositionTaking_81)}</td>
            <td>{formatDecimal(v161aPositionTaking_83)}</td>
            <td>{formatDecimal(v161aPositionTaking_88)}</td>
            <td>{formatDecimal(v161aPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Min Position</td>
            <td>{formatDecimal(v161sPositionTaking_81_Min)}</td>
            <td>{formatDecimal(v161sPositionTaking_83_Min)}</td>
            <td>{formatDecimal(v161sPositionTaking_88_Min)}</td>
            <td>{formatDecimal(v161sPositionTaking_86_Min)}</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered>
        <tbody className="text-center">
          <tr className="table-sub-header">
            <td
              rowSpan={5}
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
            <td className="text-right table-sub-header">Super Max Position</td>
            <td>{formatDecimal(v161sLivePositionTaking_85_Max)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_86_Max)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_87_Max)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_89_Max)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_90_Max)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Max Position</td>
            <td>{formatDecimal(v161mLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Agent Max Position</td>
            <td>{formatDecimal(v161aLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Min Position</td>
            <td>{formatDecimal(v161sLivePositionTaking_85_Min)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_86_Min)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_87_Min)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_89_Min)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_90_Min)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
