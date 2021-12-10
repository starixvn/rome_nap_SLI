import React from 'react';
import { useSelector } from 'react-redux';
import { Input, Label, Table } from 'reactstrap';
import { formatDecimal } from 'utils/NumberUtils';
import TableGroup from '../table-group/TableGroup';

const TableComponent = () => {
  const { data } = useSelector(
    (state: AppState) => state.customerSettingViewMember,
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
    // Agent
    v161aPositionTaking_81,
    v161aPositionTaking_83,
    v161aPositionTaking_88,
    v161aPositionTaking_86,
    v161aLivePositionTaking_85,
    v161aLivePositionTaking_86,
    v161aLivePositionTaking_87,
    v161aLivePositionTaking_89,
    v161aLivePositionTaking_90,
    // Master
    v161mPositionTaking_81,
    v161mPositionTaking_83,
    v161mPositionTaking_88,
    v161mPositionTaking_86,
    v161mLivePositionTaking_85,
    v161mLivePositionTaking_86,
    v161mLivePositionTaking_87,
    v161mLivePositionTaking_89,
    v161mLivePositionTaking_90,
    // Super
    v161sPositionTaking_81,
    v161sPositionTaking_83,
    v161sPositionTaking_88,
    v161sPositionTaking_86,
    v161sLivePositionTaking_85,
    v161sLivePositionTaking_86,
    v161sLivePositionTaking_87,
    v161sLivePositionTaking_89,
    v161sLivePositionTaking_90,
    // Master Auto
    isAuto_v161mPositionTaking_81,
    isAuto_v161mPositionTaking_83,
    isAuto_v161mPositionTaking_88,
    isAuto_v161mPositionTaking_86,
    auto_v161mPositionTaking_81,
    auto_v161mPositionTaking_83,
    auto_v161mPositionTaking_88,
    auto_v161mPositionTaking_86,
    isAuto_v161mLivePositionTaking_85,
    isAuto_v161mLivePositionTaking_86,
    isAuto_v161mLivePositionTaking_87,
    isAuto_v161mLivePositionTaking_89,
    isAuto_v161mLivePositionTaking_90,
    auto_v161mLivePositionTaking_85,
    auto_v161mLivePositionTaking_86,
    auto_v161mLivePositionTaking_87,
    auto_v161mLivePositionTaking_89,
    auto_v161mLivePositionTaking_90,
    // Super Auto
    auto_v161sPositionTaking_81,
    auto_v161sPositionTaking_83,
    auto_v161sPositionTaking_86,
    auto_v161sPositionTaking_88,
    isAuto_v161sPositionTaking_81,
    isAuto_v161sPositionTaking_83,
    isAuto_v161sPositionTaking_88,
    isAuto_v161sPositionTaking_86,
    auto_v161sLivePositionTaking_85,
    auto_v161sLivePositionTaking_86,
    auto_v161sLivePositionTaking_87,
    auto_v161sLivePositionTaking_89,
    auto_v161sLivePositionTaking_90,
    isAuto_v161sLivePositionTaking_85,
    isAuto_v161sLivePositionTaking_86,
    isAuto_v161sLivePositionTaking_87,
    isAuto_v161sLivePositionTaking_89,
    isAuto_v161sLivePositionTaking_90,
  } = data;

  return (
    <div className="table">
      <TableGroup
        level="Member"
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
        <tbody className="text-center table-position-taking-member">
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
            <td className="text-right table-sub-header">Agent</td>
            <td>{formatDecimal(v161aPositionTaking_81)}</td>
            <td>{formatDecimal(v161aPositionTaking_83)}</td>
            <td>{formatDecimal(v161aPositionTaking_88)}</td>
            <td>{formatDecimal(v161aPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master</td>
            <td>{formatDecimal(v161mPositionTaking_81)}</td>
            <td>{formatDecimal(v161mPositionTaking_83)}</td>
            <td>{formatDecimal(v161mPositionTaking_88)}</td>
            <td>{formatDecimal(v161mPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super</td>
            <td>{formatDecimal(v161sPositionTaking_81)}</td>
            <td>{formatDecimal(v161sPositionTaking_83)}</td>
            <td>{formatDecimal(v161sPositionTaking_88)}</td>
            <td>{formatDecimal(v161sPositionTaking_86)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mPositionTaking_81)}
                  disabled
                />
                {formatDecimal(auto_v161mPositionTaking_81)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mPositionTaking_83)}
                  disabled
                />
                {formatDecimal(auto_v161mPositionTaking_83)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mPositionTaking_88)}
                  disabled
                />
                {formatDecimal(auto_v161mPositionTaking_88)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mPositionTaking_86)}
                  disabled
                />
                {formatDecimal(auto_v161mPositionTaking_86)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Auto</td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_81)}
                disabled
              />
              {formatDecimal(auto_v161sPositionTaking_81)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_83)}
                disabled
              />
              {formatDecimal(auto_v161sPositionTaking_83)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_88)}
                disabled
              />
              {formatDecimal(auto_v161sPositionTaking_88)}
            </td>
            <td>
              <Input
                type="checkbox"
                checked={Boolean(isAuto_v161sPositionTaking_86)}
                disabled
              />
              {formatDecimal(auto_v161sPositionTaking_86)}
            </td>
          </tr>
        </tbody>
      </Table>
      <Table bordered>
        <tbody className="text-center table-position-taking-member">
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
            <td className="text-right table-sub-header">Agent</td>
            <td>{formatDecimal(v161aLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161aLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master</td>
            <td>{formatDecimal(v161mLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161mLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super</td>
            <td>{formatDecimal(v161sLivePositionTaking_85)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_86)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_87)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_89)}</td>
            <td>{formatDecimal(v161sLivePositionTaking_90)}</td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Master Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mLivePositionTaking_85)}
                  disabled
                />
                {formatDecimal(auto_v161mLivePositionTaking_85)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mLivePositionTaking_86)}
                  disabled
                />
                {formatDecimal(auto_v161mLivePositionTaking_86)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mLivePositionTaking_87)}
                  disabled
                />
                {formatDecimal(auto_v161mLivePositionTaking_87)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mLivePositionTaking_89)}
                  disabled
                />
                {formatDecimal(auto_v161mLivePositionTaking_89)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161mLivePositionTaking_90)}
                  disabled
                />
                {formatDecimal(auto_v161mLivePositionTaking_90)}
              </Label>
            </td>
          </tr>
          <tr>
            <td className="text-right table-sub-header">Super Auto</td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161sLivePositionTaking_85)}
                  disabled
                />
                {formatDecimal(auto_v161sLivePositionTaking_85)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161sLivePositionTaking_86)}
                  disabled
                />
                {formatDecimal(auto_v161sLivePositionTaking_86)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161sLivePositionTaking_87)}
                  disabled
                />
                {formatDecimal(auto_v161sLivePositionTaking_87)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161sLivePositionTaking_89)}
                  disabled
                />
                {formatDecimal(auto_v161sLivePositionTaking_89)}
              </Label>
            </td>
            <td>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Boolean(isAuto_v161sLivePositionTaking_90)}
                  disabled
                />
                {formatDecimal(auto_v161sLivePositionTaking_90)}
              </Label>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
