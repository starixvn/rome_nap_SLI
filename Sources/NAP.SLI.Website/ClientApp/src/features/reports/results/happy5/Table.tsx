import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store';
import GlobalSpinner from 'components/spinner/GlobalSpinner';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import Match from './Match';
import { querySoccer5, Happy5Match } from '../reducer';

const Happy5Table = () => {
  const dispatch = useAppDispatch();
  const {
    results,
    isResultLoading,
    isLeagueLoading,
    isSportLoading,
    isSoccer5Loading,
    isFromBetList,
  } = useSelector((state: AppState) => state.results);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const handleToggle = () => setModal((prevModal) => !prevModal);

  const handleSoccer5Click = async (matchId: number, balls: string) => {
    const result = await dispatch(
      querySoccer5({
        matchId,
        balls,
      }),
    );
    const urlRes = unwrapResult(result);
    setUrl(urlRes);
    handleToggle();
  };

  return isResultLoading || isLeagueLoading || isSportLoading ? (
    <></>
  ) : (
    <>
      {isSoccer5Loading && <GlobalSpinner />}
      <Table bordered striped hover>
        <thead>
          <tr className="text-center">
            <th className="col-ko-time">Kick Off. Time</th>
            <th>Match</th>
            <th className="col-result">Result</th>
            <th className="col-total">Total</th>
            <th className="col-bs">B/S</th>
            <th className="col-oe">O/E</th>
            <th className="col-4s">4S</th>
            <th className="col-mome">MO/ME</th>
            <th className="col-cb">CB</th>
            {!isFromBetList && <th className="col-soccer5">Soccer 5</th>}
            <th className="col-status">Status</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={!isFromBetList ? 11 : 10}>
                There is no information
              </td>
            </tr>
          ) : (
            results.map((league, index) => (
              <Fragment key={`${index}_${league.leagueName}`}>
                {!isFromBetList && (
                  <tr>
                    <td className="col-league" colSpan={11}>
                      {league.leagueName}
                    </td>
                  </tr>
                )}
                {league.matches.map((match) => (
                  <Match
                    key={match.matchId}
                    match={match as Happy5Match}
                    onSoccer5Click={handleSoccer5Click}
                  />
                ))}
              </Fragment>
            ))
          )}
        </tbody>
      </Table>
      <Modal
        centered
        isOpen={modal}
        size="xl"
        toggle={handleToggle}
        fade={false}
      >
        <ModalHeader toggle={handleToggle}>Happy 5</ModalHeader>
        <ModalBody>
          <iframe
            src={url}
            height="400px"
            width="100%"
            title="happy 5"
            style={{ border: 'none' }}
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Happy5Table;
