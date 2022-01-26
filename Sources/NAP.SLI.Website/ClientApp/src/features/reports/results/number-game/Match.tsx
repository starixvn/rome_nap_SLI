import React from 'react';
import BallNumber from '../components/BallNumber';
import { NumberGameMatch } from '../reducer';

type Props = {
  match: NumberGameMatch;
};

const Match = ({ match }: Props) => {
  return (
    <tr>
      <td className="text-center new-line">{match.kickOffTime}</td>
      <td className="align-middle pl-3">{match.matchNo}</td>
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

export default Match;
