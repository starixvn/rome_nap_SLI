import React from 'react';
import { getDate, getTime } from 'utils/DateUtils';
import BallNumber from './BallNumber';
import { Happy5 } from './reducer';

type Props = {
  match: Happy5;
  onSoccer5Click: (matchId: number, balls: string) => void;
};

const Happy5Match = ({ match, onSoccer5Click }: Props) => {
  return (
    <tr>
      <td className="text-center">
        {getDate(match.kickOffTime)}
        <br />
        {getTime(match.kickOffTime)}
      </td>
      <td className="align-middle pl-3">Number Game No {match.noMatch}</td>
      <td className="text-center align-middle">
        {match.eventStatusIsRefund ? (
          'N/A'
        ) : (
          <>
            <BallNumber ball={match.firstBall} />
            <BallNumber ball={match.secondBall} />
            <BallNumber ball={match.thirdBall} />
            <BallNumber ball={match.fourthBall} />
            <BallNumber ball={match.fifthBall} />
          </>
        )}
      </td>
      <td className="text-center align-middle">{match.totalBall}</td>
      <td className="text-center align-middle">{match.bigSmall}</td>
      <td className="text-center align-middle">{match.oddEven}</td>
      <td className="text-center align-middle">{match.fourSeason}</td>
      <td className="text-center align-middle">{match.moreOddMoreEven}</td>
      <td className="text-center align-middle">{match.combo}</td>
      <td className="text-center align-middle">
        <div
          className={match.soccer5Class}
          onClick={() => onSoccer5Click(match.matchId, match.balls)}
        >
          {match.soccer5}
        </div>
      </td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  );
};

export default Happy5Match;
