import React from 'react';
import { Ball } from '../types';

type Props = {
  ball: Ball;
};

const BallNumber = ({ ball }: Props) => {
  return <span className={'lottoBall ' + ball.color}>{ball.number}</span>;
};

export default BallNumber;
