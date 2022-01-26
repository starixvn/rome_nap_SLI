import React from 'react';
import BallNumber from '../components/BallNumber';
import { Happy5Match } from '../reducer';

type Props = {
  match: Happy5Match;
  onSoccer5Click: (matchId: number, balls: string) => void;
};

const Match = ({ match, onSoccer5Click }: Props) => {
  return (
    <tr>
      <td className="text-center new-line">{match.kickOffTime}</td>
      <td className="align-middle pl-3">{match.noMatch}</td>
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

export default Match;
