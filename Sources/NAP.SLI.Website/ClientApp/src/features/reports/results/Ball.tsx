import React from 'react';
import {
  HAPPY5_RED_BALLS,
  HAPPY5_SPORT_TYPE,
  NUMBERGAME_RED_BALLS,
  NUMBERGAME_SPORT_TYPE,
} from 'utils/ConstantUtils';

type Props = {
  number: string;
  sportType: number;
};

const getBallColor = (number: string, sportType: number) => {
  switch (sportType) {
    case NUMBERGAME_SPORT_TYPE:
      if (number === '00') {
        return 'disable';
      }
      return NUMBERGAME_RED_BALLS.includes(number) ? 'red' : 'blue';
    case HAPPY5_SPORT_TYPE:
      return HAPPY5_RED_BALLS.includes(number) ? 'red' : 'blue';
  }
};

const Ball = ({ number, sportType }: Props) => {
  return (
    <span className={`lottoBall ${getBallColor(number, sportType)}`}>
      {number}
    </span>
  );
};

export default Ball;
