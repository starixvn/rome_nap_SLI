import React from 'react';
import {
  AUTUMN,
  BIG,
  EVEN,
  HAPPY5_SPORT_TYPE,
  MORE_EVEN,
  MORE_ODD,
  NA,
  ODD,
  REFUND,
  REFUND_FT,
  REFUND_HT,
  SMALL,
  SPRING,
  SUMMER,
  WINTER,
} from 'utils/ConstantUtils';
import { getDate, getTime } from 'utils/DateUtils';
import Ball from './Ball';
import { Result } from './reducer';

type Props = {
  match: Result;
  onSoccer5Click: (matchId: number, ball: number[]) => void;
};

const isEventStatusRefund = (eventStatus: string) =>
  eventStatus === REFUND ||
  eventStatus === REFUND_FT ||
  eventStatus === REFUND_HT;

const getBigSmall = (total: number) => (total >= 53 ? BIG : SMALL);

const getOddEven = (total: number) => (total % 2 === 0 ? EVEN : ODD);

const getFourSeason = (total: number) => {
  if (total >= 15 && total <= 33) {
    return SPRING;
  }

  if (total >= 34 && total <= 52) {
    return SUMMER;
  }

  if (total >= 53 && total <= 71) {
    return AUTUMN;
  }

  if (total >= 72 && total <= 90) {
    return WINTER;
  }

  return NA;
};

const getMoreOddMoreEven = (ball: number[]) =>
  countOdd(ball) > 2 ? MORE_ODD : MORE_EVEN;

const countOdd = (ball: number[]) =>
  ball.reduce(
    (prevVal, curVal) => (curVal % 2 !== 0 ? prevVal + 1 : prevVal),
    0,
  );

const Happy5Match = ({ match, onSoccer5Click }: Props) => {
  const isRefund = isEventStatusRefund(match.eventStatus.toUpperCase());
  const total = match.ball.reduce((a, b) => a + b, 0);
  const totalBall = isRefund ? NA : total;
  const bigSmall = isRefund ? NA : getBigSmall(total);
  const oddEven = isRefund ? NA : getOddEven(total);
  const fourSeason = isRefund ? NA : getFourSeason(total);
  const moreOddMoreEven = isRefund ? NA : getMoreOddMoreEven(match.ball);
  const combo = isRefund ? NA : bigSmall + oddEven;
  const soccer5 = isRefund ? NA : '';
  const soccer5Class = isRefund ? '' : 'info';

  return (
    <tr>
      <td className="text-center">
        {getDate(match.kickOffTime)}
        <br />
        {getTime(match.kickOffTime)}
      </td>
      <td className="align-middle pl-3">Number Game No {match.matchCode}</td>
      <td className="text-center align-middle">
        {isRefund
          ? NA
          : match.ball.map((num, id) => (
              <Ball
                key={id}
                number={num.toString()}
                sportType={HAPPY5_SPORT_TYPE}
              />
            ))}
      </td>
      <td className="text-center align-middle">{totalBall}</td>
      <td className="text-center align-middle">{bigSmall}</td>
      <td className="text-center align-middle">{oddEven}</td>
      <td className="text-center align-middle">{fourSeason}</td>
      <td className="text-center align-middle">{moreOddMoreEven}</td>
      <td className="text-center align-middle">{combo}</td>
      <td className="text-center align-middle">
        <div
          className={soccer5Class}
          onClick={() => onSoccer5Click(match.matchId, match.ball)}
        >
          {soccer5}
        </div>
      </td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  );
};

export default Happy5Match;
