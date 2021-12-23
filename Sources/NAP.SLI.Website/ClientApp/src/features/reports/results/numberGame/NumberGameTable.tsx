import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import NumberGameMatch from './NumberGameMatch';
import '../Table.scss';
import { NumberGame } from '../types';

const NumberGameTable = () => {
  const {
    results,
    isResultLoading,
    isLeagueLoading,
    isSportLoading,
  } = useSelector((state: AppState) => state.results);

  return isResultLoading || isLeagueLoading || isSportLoading ? (
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
        {results.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={8}>
              There is no information
            </td>
          </tr>
        ) : (
          results.map((league, index) => (
            <Fragment key={`${index}_${league.leagueName}`}>
              <tr>
                <td className="font-weight-bold pl-5" colSpan={8}>
                  {league.leagueName}
                </td>
              </tr>
              {league.matches.map((match) => (
                <NumberGameMatch
                  key={match.matchId}
                  match={match as NumberGame}
                />
              ))}
            </Fragment>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default NumberGameTable;
