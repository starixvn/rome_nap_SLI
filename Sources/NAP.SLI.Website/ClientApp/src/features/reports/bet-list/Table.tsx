import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store';
import GlobalSpinner from 'components/spinner/GlobalSpinner';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { HAPPY5LINKEDGAME_SPORT_TYPE } from 'utils/ConstantUtils';
import { getHappy5LinkedGame, Ticket } from './reducer';
import './Table.scss';

const TableComponent = () => {
  const dispatch = useAppDispatch();
  const { queryData } = useSelector((state: AppState) => state.betListMatch);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');
  const isHappy5LinkedGameLoading = false;

  if (!queryData) {
    return <></>;
  }

  const handleToggle = () => setModal((prevModal) => !prevModal);

  window.ViewResult = async (
    _matchid: number,
    _race: number,
    _bettype: number,
    sporttype: number,
    refno: number,
    _username: string,
    _winlostdate: string,
    _refno_mixparlay: string,
    _league: number,
    _is_outright: number,
    betid: number,
  ) => {
    // Happy5 Linked Games
    if (sporttype === HAPPY5LINKEDGAME_SPORT_TYPE) {
      const result = await dispatch(
        getHappy5LinkedGame({
          obCustId: betid,
          tranId3rd: refno,
          isDesktop: true,
        }),
      );
      const urlRes = unwrapResult(result);
      setUrl(urlRes);
      handleToggle();
    }
  };

  const { Tickets, SumCommHtml, SumWinLossHtml, TotalHtml } = queryData;
  return (
    <>
      {isHappy5LinkedGameLoading && <GlobalSpinner />}
      <Table bordered className="bet-list-table">
        <thead>
          <tr className="text-center">
            <th className="col-number">No</th>
            <th className="col-date">Date</th>
            <th>Choice</th>
            <th className="col-odds">Odds</th>
            <th className="col-state">State</th>
            <th className="col-winloss">Win Loss</th>
            <th className="col-status">Status</th>
            <th className="col-pt">SuperPT/Comm</th>
            <th className="col-pt">MasterPT/Comm</th>
            <th className="col-pt">AgentPT/Comm</th>
          </tr>
        </thead>
        <tbody>
          {Tickets.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={10}>
                There is no information
              </td>
            </tr>
          ) : (
            <>
              {Tickets.map((ticket: Ticket, index: number) => (
                <tr key={index}>
                  <td className="text-right">{index + 1}</td>
                  <td
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: ticket.TransDateHtml,
                    }}
                  />
                  <td
                    className="text-right"
                    dangerouslySetInnerHTML={{
                      __html: ticket.ChoiceHtml,
                    }}
                  />
                  <td
                    className="text-right"
                    dangerouslySetInnerHTML={{
                      __html: ticket.OddHtml,
                    }}
                  />
                  <td
                    className="text-right"
                    dangerouslySetInnerHTML={{
                      __html: ticket.StakeHtml,
                    }}
                  />
                  <td
                    className="text-right font-weight-bold"
                    dangerouslySetInnerHTML={{
                      __html: ticket.WinLossHtml,
                    }}
                  />
                  <td
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: ticket.StatusHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray"
                    dangerouslySetInnerHTML={{
                      __html: ticket.SuperPTComHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray"
                    dangerouslySetInnerHTML={{
                      __html: ticket.MasterPTComHtml,
                    }}
                  />
                  <td
                    className="text-right bg-gray"
                    dangerouslySetInnerHTML={{
                      __html: ticket.AgentPTComHtml,
                    }}
                  />
                </tr>
              ))}
              <tr className="total text-right">
                <td colSpan={5}>Subtotal(winlost):</td>
                <td dangerouslySetInnerHTML={{ __html: SumWinLossHtml }} />
                <td colSpan={4} />
              </tr>
              <tr className="total text-right">
                <td colSpan={5}>Subtotal(Com.):</td>
                <td dangerouslySetInnerHTML={{ __html: SumCommHtml }} />
                <td colSpan={4} />
              </tr>
              <tr className="total text-right">
                <td colSpan={5}>Total:</td>
                <td dangerouslySetInnerHTML={{ __html: TotalHtml }} />
                <td colSpan={4} />
              </tr>
            </>
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
        <ModalHeader toggle={handleToggle}>Results </ModalHeader>
        <ModalBody>
          <iframe
            src={url}
            height="600px"
            width="100%"
            title="results"
            style={{ border: 'none' }}
          ></iframe>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TableComponent;
