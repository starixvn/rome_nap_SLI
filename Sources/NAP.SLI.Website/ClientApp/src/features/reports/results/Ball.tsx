import React from 'react';
import { RED_BALL } from 'utils/ConstantUtils';

type Props = {
  number: string;
};

const getBallColor = (number: string) => {
  if (number === '00') {
    return 'disable';
  }

  return RED_BALL.includes(number) ? 'red' : 'blue';
};

const Ball = ({ number }: Props) => {
  return <span className={`lottoBall ${getBallColor(number)}`}>{number}</span>;
};

export default Ball;
