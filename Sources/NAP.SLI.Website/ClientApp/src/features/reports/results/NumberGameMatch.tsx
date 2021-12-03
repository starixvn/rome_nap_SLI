import React from 'react';
import { NUMBERGAME_SPORT_TYPE } from 'utils/ConstantUtils';
import { getDate, getTime } from 'utils/DateUtils';
import { formatTwoDigit } from 'utils/NumberUtils';
import Ball from './Ball';
import { Result } from './reducer';

type Props = {
  match: Result;
};

const isSumEven = (ball: number[]) => {
  return ball.reduce((prevVal, curVal) => prevVal + curVal, 0) % 2 === 0;
};

const NumberGameMatch = ({ match }: Props) => {
  const FTOE = isSumEven(match.ball) ? 'Even' : 'Odd';

  return (
    <tr>
      <td className="text-center">
        {getDate(match.kickOffTime)}
        <br />
        {getTime(match.kickOffTime)}
      </td>
      <td className="align-middle pl-3">Number Game No {match.matchCode}</td>
      <td className="text-center align-middle">{FTOE}</td>
      <td className="text-center align-middle">
        <Ball
          sportType={NUMBERGAME_SPORT_TYPE}
          number={formatTwoDigit(match.ball[0])}
        />
      </td>
      <td className="text-center align-middle">
        <Ball
          sportType={NUMBERGAME_SPORT_TYPE}
          number={formatTwoDigit(match.ball[1])}
        />
      </td>
      <td className="text-center align-middle">
        <Ball
          sportType={NUMBERGAME_SPORT_TYPE}
          number={formatTwoDigit(match.ball[2])}
        />
      </td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  );
};

export default NumberGameMatch;
