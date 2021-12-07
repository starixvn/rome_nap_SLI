import React from 'react';
import { getDate, getTime } from 'utils/DateUtils';
import BallNumber from './BallNumber';
import { NumberGame } from './reducer';

type Props = {
  match: NumberGame;
};

const NumberGameMatch = ({ match }: Props) => {
  return (
    <tr>
      <td className="text-center">
        {getDate(match.kickOffTime)}
        <br />
        {getTime(match.kickOffTime)}
      </td>
      <td className="align-middle pl-3">Number Game {match.noMatch}</td>
      <td className="text-center align-middle">{match.oeft}</td>
      <td className="text-center align-middle">
        <BallNumber ball={match.firstBall} />
      </td>
      <td className="text-center align-middle">
        <BallNumber ball={match.secondBall} />
      </td>
      <td className="text-center align-middle">
        <BallNumber ball={match.thirdBall} />
      </td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  );
};

export default NumberGameMatch;
