import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getDate, getTime } from 'utils/DateUtils';
import { formatTwoDigit } from 'utils/NumberUtils';
import Ball from './Ball';
import { NumberGame } from './reducer';
import './Table.scss';

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
        {match.ball.map((num, id) => (
          <Ball key={id} number={formatTwoDigit(num)} />
        ))}
      </td>
      <td className="text-center align-middle">
        {match.ball.reduce((a, b) => a + b, 0)}
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td className="text-center align-middle font-weight-bold text-capitalize">
        {match.eventStatus}
      </td>
    </tr>
  ));

const Happy5Table = () => {
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
          <th className="col-result">Result</th>
          <th className="col-total">Total</th>
          <th className="col-bs">B/S</th>
          <th className="col-oe">O/E</th>
          <th className="col-4s">4S</th>
          <th className="col-mome">MO/ME</th>
          <th className="col-cb">CB</th>
          <th className="col-soccer5">Soccer 5</th>
          <th className="col-status">Status</th>
        </tr>
      </thead>
      <tbody>
        {numberGames.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={11}>
              There is no information
            </td>
          </tr>
        ) : (
          numberGames.map((league, index) => (
            <>
              <tr key={index}>
                <td className="font-weight-bold pl-5" colSpan={11}>
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

export default Happy5Table;
