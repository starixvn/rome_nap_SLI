import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getDate, getTime } from 'utils/DateUtils';
import { formatTwoDigit } from 'utils/NumberUtils';
import Ball from './Ball';
import { NumberGame } from './reducer';
import './Table.scss';

const isSumEven = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0) % 2 === 0;
};

const renderMatches = (matches: NumberGame[]) =>
  matches.map((match) => (
    <tr key={match.matchId}>
      <td className="text-center">
        {getDate(match.kickOffTime)}
        <br />
        {getTime(match.kickOffTime)}
      </td>
      <td className="align-middle pl-3">Number Game No {match.matchCode}</td>
      <td className="text-center align-middle">
        {isSumEven(match.ball) ? 'Even' : 'Odd'}
      </td>
      <td className="text-center align-middle">
        <Ball number={formatTwoDigit(match.ball[0])} />
      </td>
      <td className="text-center align-middle">
        <Ball number={formatTwoDigit(match.ball[1])} />
      </td>
      <td className="text-center align-middle">
        <Ball number={formatTwoDigit(match.ball[2])} />
      </td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  ));

const NumberGameTable = () => {
  const {
    numberGames,
    isNumberGameLoading,
    isLeagueLoading,
    isSportLoading,
  } = useSelector((state: AppState) => state.results);

  return isNumberGameLoading || isLeagueLoading || isSportLoading ? (
    <></>
  ) : (
    <Table bordered striped hover>
      <thead>
        <tr className="text-center">
          <th className="col-kick-off">Kick Off. Time</th>
          <th>Match</th>
          <th className="col-oeft">FT.O/E</th>
          <th className="col-1st-ball">1st Ball</th>
          <th className="col-2nd-ball">2nd Ball</th>
          <th className="col-3rd-ball">3rd Ball</th>
          <th className="col-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {numberGames.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8}>
              There is no information
            </td>
          </tr>
        ) : (
          numberGames.map((league, index) => (
            <>
              <tr key={index}>
                <td className="font-weight-bold pl-5" colSpan={8}>
                  {league.leagueName}
                </td>
              </tr>
              {renderMatches(league.matches)}
            </>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default NumberGameTable;
